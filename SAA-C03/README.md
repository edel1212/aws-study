# SAA-C03 핵심 정리 노트

## 1. 컴퓨팅 (Compute)

### 1-2. Lambda
- 정의: 서버를 직접 관리하지 않고, **코드(함수)를 실행해주는 서버리스 컴퓨팅 서비스**
  - ⚠️ "Lambda = 서버리스 API"는 좁은 이해. API에 자주 쓰일 뿐, **API 전용은 아님**
- 이벤트 기반 (S3 업로드, API Gateway 호출, EventBridge 등) 실행
- 최대 실행 시간: 15분 (**장시간 작업에는 부적합** → ECS/Fargate 고려)

## 2. 스토리지 (Storage)

### 2-1. EBS vs S3 vs EFS 차이
> ⚠️ S3는 트랜잭션·동적 데이터 처리에 부적합 (정적 파일 저장소이기 때문). 주문 처리용 DB로 쓰면 안 됨.

| 서비스 | 비유 | 특징 |
|--------|------|------|
| **EBS** | EC2에 붙이는 SSD 하드디스크 | **단일 EC2 전용** (io2는 다중 연결 가능), 블록 스토리지 |
| **S3** | AWS의 무제한 파일 저장소 | 객체 스토리지, HTTP API로 접근, **정적 파일용** |
| **EFS** | 여러 EC2가 동시에 쓰는 공유 폴더 | **NFS 기반**, Linux 전용, **다중 AZ 자동** |

### 2-2. EBS 스냅샷 
- 시간 점 기준으로 볼륨을 S3에 자동 백업
- 증분 백업 (**변경된 블록만 저장** → 비용 절감)
- 빠른 스냅샷 복원(Fast Snapshot Restore, FSR): **복원 직후**부터 **일관된 고성능 I/O** 제공
- **출제 신호**: "복제 시간 최소화" + "즉시 일관된 고I/O" + "프로덕션 영향 없음" → EBS 스냅샷 + FSR

### 2-3. S3 스토리지 클래스 구분 (출제 단골)

| 키워드 | 정답 |
|--------|------|
| 예측 불가능/변하는 액세스 패턴 + 자동 비용 최적화 | **S3 Intelligent-Tiering** |
| 자주 접근 | S3 Standard |
| 가끔 접근(패턴 명확) + 다중 AZ | S3 Standard-IA |
| 가끔 접근 + 단일 AZ 허용 + 최저 비용 | S3 One Zone-IA (복원력 필요 시 오답) |
| 거의 접근 안 함, 아카이브 | S3 Glacier 계열 (Instant Retrieval / Flexible / Deep Archive) |

### 2-4. S3 전송 가속 (Transfer Acceleration)
- **CloudFront 엣지 로케이션을 경유**해 S3에 **빠르게 업로드**
- **출제 패턴**: 원거리에서 대용량 파일을 S3에 빠르게 업로드 → "S3 Transfer Acceleration + Multipart Upload"

### 2-5. Storage Gateway 4종류

| 종류 | 용도 |
|------|------|
| **S3 File Gateway** | 파일(NFS/SMB)을 S3에 저장 |
| **FSx File Gateway** | 파일을 Amazon FSx(Windows 파일 서버)에 저장 |
| **Volume Gateway** | 블록 스토리지(iSCSI)를 클라우드에 백업 |
| **Tape Gateway** | 가상 테이프로 백업·아카이브 (기존 테이프 백업 대체) |


## 3. 데이터베이스

### 3-1. Aurora의 강점
- MySQL/PostgreSQL 호환 → 기존 앱 그대로 이전 가능
- Aurora 복제본(Read Replica) 으로 읽기 부하 분산 (최대 15개)
- Aurora Auto Scaling → 읽기 부하에 따라 복제본 자동 증감 (예측 불가 읽기 수요에 최적)
- Multi-AZ 배포로 높은 가용성
- **출제 신호**: "읽기 복제본을 자동 확장" → Aurora
  
  


---
Amazon Athena

---

S3 버킷에서 S3 전송 가속을 활성화합니다. 멀티파트 업로드를 사용하여 사이트 데이터를 대상 S3 버킷에 직접 업로드
AWS PrincipalOrgID

---

EBS 와 S3 차이
- EBS = EC2에 붙이는 SSD 하드디스크
- S3 = AWS에서 제공하는 무제한에 가까운 파일 저장소
- EFS = 여러 EC2가 동시에 사용하는 공유 폴더

---

##
"여러 시스템에 이벤트 전달" → SNS + SQS
"대규모 실시간 스트리밍" → Kinesis / MSK
"작업 큐" → SQS

---

##
AWS Secrets Manager

--- 
암기 팁 (CloudFront vs Global Accelerator 구분):

"정적/동적 콘텐츠 캐싱", "웹/HTTP", "S3·웹사이트 가속" → CloudFront (CDN)
"고정 IP", "비-HTTP(게임·IoT·UDP)", "글로벌 네트워크 라우팅" → Global Accelerator

---

Aurora의 강점:
-MySQL/PostgreSQL 호환 → 기존 MySQL 8.0 앱을 그대로 옮기기 좋음
-Aurora 복제본(Read Replica) 으로 읽기 부하 분산
-Aurora Auto Scaling → 읽기 부하에 따라 복제본 수를 자동으로 늘리고 줄임 (예측 불가능한 읽기 수요에 딱 맞음)
-Multi-AZ 배포로 높은 가용성 확보
-읽기 복제본을 자동으로 확장"이라고 나오면 → Aurora 신호

---

AWS Network Firewall:

VPC 단위로 트래픽을 검사하고 필터링하는 관리형 네트워크 방화벽
들어오고(inbound) 나가는(outbound) 트래픽을 규칙에 따라 검사·차단·허용
온프레미스의 "검사 서버(inspection server)"가 하던 일을 AWS에서 그대로 대체하는 정석 서비스

---
암기 팁 (방화벽/보안 서비스 구분):

"VPC 트래픽 검사·필터링" (실제 검사·차단) → AWS Network Firewall (이번 문제)
"여러 계정의 방화벽 규칙 중앙 관리" → AWS Firewall Manager
"위협 탐지·알림" (분석만, 차단 안 함) → GuardDuty
"웹 애플리케이션 보호" (SQL인젝션, XSS 등 L7) → AWS WAF

---
QuickSight 대시보드는 IAM 역할이 아니라 QuickSight 사용자/그룹에게 공유
ㄴ> 시각화 및 보고서 사이트 

---

"third-party appliance(타사 어플라이언스)" + "패킷 검사" 가 같이 나오면 → Gateway Load Balancer 가 거의 정답

----
"덤프의 단점을 다 해결한 AWS식 덤프" 가 EBS 스냅샷

---
Storage Gateway의 다른 종류 (참고로 구분)
S3 File Gateway는 Storage Gateway 4종류 중 하나입니다:
종류용도S3 File Gateway파일(NFS/SMB)을 S3에 저장FSx File Gateway파일을 Amazon FSx(Windows 파일 서버)에 저장Volume Gateway블록 스토리지(iSCSI) 를 클라우드에 백업Tape Gateway가상 테이프로 백업·아카이브 (기존 테이프 백업 대체)

---

KMS 어디에 쓰이나? (실제 예시)
대부분의 AWS 스토리지/DB 암호화가 KMS와 연결됩니다:

S3 버킷 암호화 → S3에 저장되는 파일을 KMS 키로 암호화
EBS 볼륨 암호화 → 디스크 데이터를 KMS 키로 암호화
RDS 데이터베이스 암호화 → DB 데이터를 KMS 키로 암호화

---

대상붙일 수 있는 것그룹(Group)정책 ⭕, 사용자 ⭕, 역할 ❌사용자(User)정책 ⭕, 그룹 소속 ⭕역할(Role)정책 ⭕, (서비스에 연결 ⭕)EC2 등 서비스역할 ⭕, 정책 직접 ❌
---

Gateway Load Balancer는 타사 가상 어플라이언스(방화벽/IDS/IPS) 통합 전용으로 설계됨. GWLB 엔드포인트를 통해 IP 패킷을 어플라이언스로 보내 검사하고 되돌림. "IP 패킷 수신 어플라이언스"와 정확히 일치. 

핵심 신호: "타사 어플라이언스(third-party appliance)" + "패킷 검사" → Gateway Load Balancer

---

"복제 시간 최소화" + "일관되게 높은 I/O 성능 즉시 필요" + "테스트 수정이 프로덕션에 영향 없어야" → 정답은 EBS 스냅샷 + 빠른 스냅샷 복원(Fast Snapshot Restore, FSR) 입니다.

---

S3는 정적 파일 저장소이지 주문 처리용 데이터베이스가 아닙니다. 트랜잭션·동적 데이터 처리에 부적합.
---

(S3 스토리지 클래스 구분):

"예측 불가능한/변하는 액세스 패턴" + "자동 비용 최적화" → S3 Intelligent-Tiering ← 이번 문제
"자주 접근" → S3 Standard
"가끔 접근(패턴 명확)" + 여러 AZ → S3 Standard-IA
"가끔 접근 + 단일 AZ 허용 + 최저 비용" → S3 One Zone-IA (복원력 필요하면 오답)
"거의 접근 안 함, 보관(아카이브)" → S3 Glacier 계열

---

비용관련

"비용 분석·시각화·심층 파고들기" + "최소 오버헤드" → Cost Explorer
"예산 설정·초과 알림" → AWS Budgets
"상세 원시 데이터(라인 아이템 수준) 보고서" → Cost and Usage Report (CUR) (단, 분석하려면 QuickSight 등 추가 구성 필요 → 오버헤드 큼)
"간단한 비용 개요 확인" → Billing 대시보드

---
AWS 점검/감사 서비스 구분

"리소스 구성 변경 추적·평가·규정 준수" → AWS Config 
"모범 사례 권장(비용·보안·성능 체크리스트)" → Trusted Advisor
"EC2/컨테이너 보안 취약점 스캔" → Amazon Inspector
"API 호출/활동 감사 로그(누가 무엇을 했나)" → CloudTrail
"위협 탐지(의심스러운 활동)" → GuardDuty
---


"IAM Identity Center(AWS SSO) + 자체 관리 AD 연결" → 양방향(two-way) 트러스트 필수

Organizations + 여러 Account + SSO	IAM Identity Center(AWS SSO)
온프레미스 Microsoft AD 계속 사용	AWS Managed Microsoft AD
사용자/그룹 유지	Bidirectional Forest Trust

---
RDS의 "중지(stop)" 제약입니다. RDS DB 인스턴스를 중지하면 최대 7일 후 자동으로 다시 시작됩니다. 한 달(약 30일) 동안 쉬게 하려면 중지만으로는 부족합니다. 그래서 스냅샷을 만들고 인스턴스를 완전히 삭제(종료) 한 뒤, 다음 달에 스냅샷에서 복원하는 게 가장 비용 효율적
---
AWS 태그(Tag)란?
- AWS 리소스(EC2, RDS, S3 등)에 붙이는 이름표(라벨) 입니다. 키(Key) = 값(Value) 쌍으로 되어 있다
- 태그를 기반으로 "운영 환경 서버만 보여줘", "백엔드 팀 서버만 골라줘" 같은 게 가능해집니다.
```text
EC2 인스턴스 #1
  Environment = Production   (운영 환경)
  Team        = Backend       (백엔드 팀 소유)
  Project     = Shopping      (쇼핑몰 프로젝트)

EC2 인스턴스 #2
  Environment = Development   (개발 환경)
  Team        = Frontend
  Project     = Shopping
```
Kinesis Data Streams = DB가 아닙니다 (통로/파이프라인입니다)앞에서도 잠깐 다뤘는데, 핵심은 "저장소(DB)가 아니라 흘려보내는 통로"
---
Lambda = "서버리스 API"라기보단 "서버리스 코드 실행" (더 넓은 개념)
회원님이 "Lambda = 서버리스 API"라고 이해하신 건 반은 맞고 반은 좁습니다. Lambda는 API를 만드는 데 자주 쓰이지만, API 전용은 아닙니다.
Lambda의 정확한 정의:

서버를 직접 관리하지 않고, 코드(함수)를 실행해주는 서버리스 컴퓨팅 서비스

---
다이나모 디비는 NoSql이며 트랜잭션 처리가 가능차
---
Elastic Load Balancing (전체를 묶는 이름)
ELB는 AWS의 로드 밸런싱 서비스 전체를 가리키는 이름입니다. 특정 로드 밸런서 하나가 아니라, 여러 종류의 로드 밸런서를 통칭하는 큰 카테고리예요.

ELB의 4가지 종류
종류계층용도특징ALB (Application)7계층 (HTTP/HTTPS)웹 애플리케이션URL·경로 기반 라우팅 가능NLB (Network)4계층 (TCP/UDP)초고성능, 저지연고정 IP, UDP 처리 (VoIP 등)GWLB (Gateway)3계층 (IP 패킷)타사 보안 어플라이언스 통합방화벽·IDS 검사

---

DDoS 방어 전용 서비스 = AWS Shield
shield는 두 단계가 있습니다:

Shield Standard (무료, 자동) → 일반적인 DDoS 자동 방어
Shield Advanced (유료) → 대규모·고도화된 DDoS 방어, 실시간 공격 감지·가시성, 24/7 대응팀(DRT), 비용 보호 등

--- 

SSE = 서버 측 암호화 (S3가 저장 시 자동 암호화)
SSE-S3 = 키를 S3(AWS)가 전부 관리 (가장 간단, 단 사용자 제어 불가)
SSE-KMS = KMS 키 사용 (고객 관리형 키로 권한·순환·감사 제어 가능)
SSE-C = 사용자가 키 직접 제공