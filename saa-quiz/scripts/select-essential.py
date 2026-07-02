#!/usr/bin/env python3
"""
Curate ~200 essential questions from the full 725 question bank.

Strategy:
1. Tag each question by AWS services it mentions + scenario type
2. Deduplicate near-identical questions using shingled question text
3. Sample proportionally per (primary service, scenario) bucket to hit ~200
"""
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUESTIONS_PATH = ROOT / "data" / "questions.json"
OUT_PATH = ROOT / "data" / "essential-ids.json"

# Service taxonomy. Order matters for primary-service tie-breaking; earlier = higher specificity.
SERVICE_PATTERNS = [
    ("Aurora",           [r"Aurora"]),
    ("DynamoDB",         [r"DynamoDB", r"DAX"]),
    ("Redshift",         [r"Redshift"]),
    ("ElastiCache",      [r"ElastiCache", r"Memcached", r"\bRedis\b"]),
    ("DocumentDB",       [r"DocumentDB"]),
    ("Neptune",          [r"Neptune"]),
    ("RDS",              [r"\bRDS\b", r"MySQL", r"PostgreSQL", r"MariaDB", r"\bOracle\b", r"SQL Server"]),
    ("S3",               [r"\bS3\b", r"Amazon Simple Storage", r"S3 Glacier", r"\bGlacier\b"]),
    ("EBS",              [r"\bEBS\b", r"Elastic Block Store"]),
    ("EFS",              [r"\bEFS\b", r"Elastic File System"]),
    ("FSx",              [r"\bFSx\b"]),
    ("StorageGateway",   [r"Storage Gateway", r"스토리지 게이트웨이"]),
    ("Snow",             [r"Snowball", r"Snowmobile", r"Snowcone", r"Snow Family"]),
    ("Lambda",           [r"\bLambda\b"]),
    ("ECS",              [r"\bECS\b", r"Fargate"]),
    ("EKS",              [r"\bEKS\b", r"Kubernetes"]),
    ("Batch",            [r"AWS Batch"]),
    ("Beanstalk",        [r"Elastic Beanstalk"]),
    ("EC2",              [r"\bEC2\b", r"Auto Scaling", r"오토 스케일링"]),
    ("CloudFront",       [r"CloudFront"]),
    ("Route53",          [r"Route ?53"]),
    ("APIGateway",       [r"API Gateway"]),
    ("DirectConnect",    [r"Direct Connect", r"다이렉트 커넥트"]),
    ("VPN",              [r"\bVPN\b", r"Site-to-Site"]),
    ("TransitGateway",   [r"Transit Gateway", r"전송 게이트웨이"]),
    ("GlobalAccelerator",[r"Global Accelerator"]),
    ("LoadBalancer",     [r"Application Load Balancer", r"\bALB\b", r"Network Load Balancer", r"\bNLB\b", r"Gateway Load Balancer", r"\bELB\b", r"로드 ?밸런서"]),
    ("VPC",              [r"\bVPC\b", r"PrivateLink", r"NAT Gateway", r"VPC 엔드포인트"]),
    ("IAM",              [r"\bIAM\b", r"역할", r"정책", r"STS", r"AssumeRole"]),
    ("KMS",              [r"\bKMS\b", r"Key Management"]),
    ("SecretsManager",   [r"Secrets Manager"]),
    ("Cognito",          [r"Cognito"]),
    ("WAF",              [r"\bWAF\b"]),
    ("Shield",           [r"\bShield\b"]),
    ("GuardDuty",        [r"GuardDuty"]),
    ("Macie",            [r"Macie"]),
    ("Inspector",        [r"Inspector"]),
    ("SQS",              [r"\bSQS\b"]),
    ("SNS",              [r"\bSNS\b"]),
    ("EventBridge",      [r"EventBridge", r"CloudWatch Events"]),
    ("StepFunctions",    [r"Step Functions"]),
    ("MQ",               [r"Amazon MQ", r"RabbitMQ", r"ActiveMQ"]),
    ("Kinesis",          [r"Kinesis"]),
    ("MSK",              [r"\bMSK\b", r"Managed Streaming"]),
    ("Athena",           [r"Athena"]),
    ("Glue",             [r"\bGlue\b"]),
    ("EMR",              [r"\bEMR\b"]),
    ("QuickSight",       [r"QuickSight"]),
    ("CloudWatch",       [r"CloudWatch"]),
    ("CloudTrail",       [r"CloudTrail"]),
    ("Config",           [r"AWS Config"]),
    ("SystemsManager",   [r"Systems Manager", r"\bSSM\b"]),
    ("Organizations",    [r"Organizations", r"SCP"]),
    ("ControlTower",     [r"Control Tower"]),
    ("DMS",              [r"\bDMS\b", r"Database Migration"]),
    ("DataSync",         [r"DataSync"]),
    ("Backup",           [r"AWS Backup"]),
    ("Outposts",         [r"Outposts"]),
    ("AppSync",          [r"AppSync"]),
    ("Workspaces",       [r"WorkSpaces"]),
]

SCENARIO_PATTERNS = [
    ("HA",          [r"고가용성", r"가용성", r"다중 ?AZ", r"failover", r"장애 ?조치", r"이중화"]),
    ("Cost",        [r"비용", r"저렴", r"최저", r"운영 비용", r"비용 ?최적화", r"cost"]),
    ("Performance", [r"성능", r"지연 ?시간", r"처리량", r"latency", r"throughput", r"빠르"]),
    ("Security",    [r"암호화", r"보안", r"권한", r"접근 ?제어", r"감사", r"규정"]),
    ("Migration",   [r"마이그레이션", r"이전", r"온프레미스", r"on-?premises"]),
    ("DR",          [r"재해 ?복구", r"백업", r"복원", r"RPO", r"RTO"]),
    ("Operations",  [r"운영 ?오버헤드", r"운영 ?복잡성", r"관리형", r"서버리스", r"최소한의"]),
    ("Analytics",   [r"분석", r"쿼리", r"로그", r"메트릭", r"데이터 ?레이크"]),
]


def detect_services(text):
    hits = []
    for name, pats in SERVICE_PATTERNS:
        for p in pats:
            if re.search(p, text, re.IGNORECASE):
                hits.append(name)
                break
    return hits


def detect_scenarios(text):
    hits = []
    for name, pats in SCENARIO_PATTERNS:
        for p in pats:
            if re.search(p, text, re.IGNORECASE):
                hits.append(name)
                break
    return hits


def normalize(text):
    """Cheap normalization for dup detection."""
    t = re.sub(r"\s+", " ", text)
    t = re.sub(r"[\(\)\[\]\.,;:!?\"'`~\-_/]", "", t)
    return t.strip().lower()


def shingles(text, k=8):
    n = normalize(text)
    return {n[i:i + k] for i in range(0, max(0, len(n) - k + 1))}


def jaccard(a, b):
    if not a or not b:
        return 0.0
    inter = len(a & b)
    union = len(a | b)
    return inter / union if union else 0.0


def main():
    questions = json.loads(QUESTIONS_PATH.read_text(encoding="utf-8"))
    print(f"Loaded {len(questions)} questions")

    # Tag every question
    enriched = []
    for q in questions:
        # combine question + options for richer signal
        opts = q.get("options") or {}
        text = q["question"] + " " + " ".join(opts.values())
        services = detect_services(text)
        scenarios = detect_scenarios(text)
        primary_service = services[0] if services else "Other"
        primary_scenario = scenarios[0] if scenarios else "General"
        enriched.append({
            "id": q["id"],
            "primary_service": primary_service,
            "all_services": services,
            "primary_scenario": primary_scenario,
            "scenarios": scenarios,
            "shingles": shingles(q["question"]),
            "qlen": len(q["question"]),
        })

    service_dist = Counter(e["primary_service"] for e in enriched)
    print("Top services (primary):")
    for s, c in service_dist.most_common(15):
        print(f"  {s:20s} {c}")

    # Bucket by (primary_service, primary_scenario)
    buckets = defaultdict(list)
    for e in enriched:
        buckets[(e["primary_service"], e["primary_scenario"])].append(e)

    # Within each bucket, dedupe near-duplicates greedily
    DUP_THRESHOLD = 0.55
    deduped_buckets = {}
    removed = 0
    for key, items in buckets.items():
        # sort: longer questions tend to be richer; keep the richer one first
        items_sorted = sorted(items, key=lambda x: -x["qlen"])
        kept = []
        for it in items_sorted:
            is_dup = any(jaccard(it["shingles"], k["shingles"]) >= DUP_THRESHOLD for k in kept)
            if is_dup:
                removed += 1
                continue
            kept.append(it)
        deduped_buckets[key] = kept
    total_after_dedup = sum(len(v) for v in deduped_buckets.values())
    print(f"After dedup: {total_after_dedup} (removed {removed} near-duplicates)")

    # Now select ~200 proportionally to bucket size, with a floor of 1 per bucket
    # weighted toward primary_service distribution
    TARGET = 200
    # First pass: 1 per non-empty bucket
    selected = []
    remaining_per_bucket = {}
    for key, items in deduped_buckets.items():
        if not items:
            continue
        selected.append(items[0])
        remaining_per_bucket[key] = items[1:]

    # Second pass: distribute the rest proportionally to bucket size
    if len(selected) < TARGET:
        slots_left = TARGET - len(selected)
        weighted = [(k, len(v)) for k, v in remaining_per_bucket.items() if v]
        total_w = sum(w for _, w in weighted)
        if total_w > 0:
            allocations = {}
            for k, w in weighted:
                allocations[k] = int(round(slots_left * w / total_w))
            # cap to actual availability
            for k in allocations:
                allocations[k] = min(allocations[k], len(remaining_per_bucket[k]))
            for k, n in allocations.items():
                selected.extend(remaining_per_bucket[k][:n])
                remaining_per_bucket[k] = remaining_per_bucket[k][n:]

    # Trim or top-up to hit TARGET exactly
    if len(selected) > TARGET:
        # drop from the largest service buckets first (over-represented)
        by_service = defaultdict(list)
        for s in selected:
            by_service[s["primary_service"]].append(s)
        # repeatedly drop one from the largest bucket until at TARGET
        while len(selected) > TARGET:
            largest = max(by_service.values(), key=len)
            dropped = largest.pop()
            selected.remove(dropped)
    elif len(selected) < TARGET:
        # top up from remaining
        leftovers = [it for items in remaining_per_bucket.values() for it in items]
        leftovers.sort(key=lambda x: -x["qlen"])
        need = TARGET - len(selected)
        selected.extend(leftovers[:need])

    selected.sort(key=lambda x: x["id"])
    ids = [s["id"] for s in selected]

    # Final breakdown for sanity
    print(f"\nFinal selection: {len(ids)} questions")
    final_service = Counter(s["primary_service"] for s in selected)
    print("Service distribution in selection:")
    for s, c in final_service.most_common():
        print(f"  {s:20s} {c}")

    OUT_PATH.write_text(json.dumps(ids, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nWrote {OUT_PATH}")


if __name__ == "__main__":
    main()
