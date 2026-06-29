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

## KMS 어디에 쓰이나? (실제 예시)
- KMS의 주요 기능은 암/복호화다 (복호화도 가능함)
### 대부분의 AWS 스토리지/DB 암호화가 KMS와 연결됩니다:
- S3 버킷 암호화 → S3에 저장되는 파일을 KMS 키로 암호화
- EBS 볼륨 암호화 → 디스크 데이터를 KMS 키로 암호화
- RDS 데이터베이스 암호화 → DB 데이터를 KMS 키로 암호화

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
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

#### 여기부터 재시작

## 핵심 키워드는 "데이터베이스 스토리지 성능이 문제" + "삽입(insert) 작업이 느림" + "매일 수백만 건 업데이트" 입니다. 즉, 스토리지의 I/O 처리 능력(IOPS) 이 병목
=> IOPS SSD로 변경

---

## Kinesis Data Firehose 와 Kinesis Data stream 차이

- Kinesis Data Streams = 데이터를 여러 소비자에게 실시간으로 흘려보내는 통로 (읽어가는 건 내가 처리)
- Kinesis Data Firehose = 데이터를 목적지(S3 등)로 자동 배달·적재하는 서비스 (배달까지 알아서)
---
## Amazon AppFlow:

- SaaS 애플리케이션(Salesforce, Slack, Google Analytics 등)과 AWS 서비스 간 데이터를 전송하는 완전관리형 통합 서비스
- EC2 없이 SaaS → S3 데이터 전송을 코드·서버 관리 없이 자동 처리 → 느린 EC2를 없애고 성능·관리 모두 개선

- "여러 SaaS 애플리케이션(Salesforce, Slack 등)과 AWS 간 데이터 전송/통합" → Amazon AppFlow
---

## NAT = 프라이빗 서버가 인터넷으로 "나갈 수 있게" 해주는 통로 (들어오는 건 막음)

- "인바운드 차단"의 정확한 의미
  - NAT가 차단하는 "인바운드"는 외부가 아무 맥락 없이 먼저 시작하는 연결입니다.
  - NAT 차단 = "외부가 먼저 시작하는 연결"만 차단
---

## AZ
- AZ(가용 영역) = 물리적으로 분리된 데이터센터 → 여러 AZ 분산 = 고가용성
- 가용 영역(AZ, Availability Zone) = 한 리전 안의 물리적으로 분리된 데이터센터. 보통 한 리전에 여러 개 있음 (예: ap-northeast-2a, 2b, 2c)
- 서브넷(Subnet) = VPC를 나눈 작은 네트워크 구획. 각 서브넷은 하나의 AZ에 속함
```text


VPC (내 네트워크)
├── AZ-a
│    └── 서브넷 A ─ EC2 인스턴스들
├── AZ-b
│    └── 서브넷 B ─ EC2 인스턴스들
└── AZ-c
└── 서브넷 C ─ EC2 인스턴스들
```

---

## NAT vs 인터넷 게이트웨이 헷갈리지 않기
둘 다 인터넷 관련이라 헷갈리는데:
인터넷 게이트웨이 (IGW)NAT 게이트웨이역할VPC의 인터넷 연결 입구 (양방향 통로 자체)프라이빗 서버의 나가는 길 중계위치VPC에 붙음퍼블릭 서브넷에 위치들어오는 요청통과 가능 (퍼블릭 리소스 대상)❌ 차단나가는 요청퍼블릭 리소스가 직접 사용프라이빗 리소스가 사용
---

# AWS Direct Connect:

온프레미스 데이터센터와 AWS를 잇는 전용 네트워크 회선(dedicated connection)
일반 인터넷을 거치지 않고 전용선으로 AWS에 직접 연결 → 빠르고 일관된 대역폭
백업 트래픽을 전용선으로 분리하므로, 내부 사용자의 인터넷 회선에 영향 없음

---

# Snowball

- Snowball은 대량 데이터를 물리 장치로 일회성/대규모 마이그레이션할 때 쓰는 것입니다. 매일 장치를 주문·적재·반송하는 건 비현실적이고, "시간에 민감(적시)"한 백업에 부적합 (배송 지연). 장기 솔루션도 아님.

---

# Amazon Inspector
- Amazon Inspector = "보안 취약점(CVE) 자동 스캔"
- 검사 대상: EC2, 컨테이너 이미지(ECR), Lambda

--- 

# Amazon Macie
- 머신러닝으로 S3의 데이터에서 PII·민감 정보를 자동 탐지하는 관리형 서비스
- 사용자가 직접 탐지 알고리즘을 짤 필요 없음 → 최소 개발 노력 (요구 충족)

---

# EventBridge 
- AWS 서비스에서 자동 발생하는 이벤트를 감지해서, 규칙에 따라 적절한 곳(SNS 등)으로 라우팅(연결)


---

# 예약 인스턴스 
- 예약 인스턴스는 기본적으로 비용 할인 약정(1~3년) 용입니다. "1주일짜리 짧은 용량 보장"에는 부적절

---

# EC2 요금(구매) 옵션 4가지 비교
EC2를 빌리는 방식은 여러 가지가 있고, 온디맨드는 그중 기본형입니다:
방식특징언제 쓰나온디맨드 (On-Demand)약정 없이 쓴 만큼 과금, 가장 유연, 단가 높음예측 불가·단기·테스트예약 인스턴스 (Reserved)1~3년 약정 → 큰 할인꾸준히 오래 쓸 때 (비용 절감)Savings Plans일정 사용량 약정 → 할인예약 인스턴스와 비슷, 더 유연스팟 (Spot)남는 용량을 싸게 → 최대 90% 할인, 단 중단될 수 있음중단돼도 괜찮은 작업 (배치 등)

- saving plan :시간당 OO달러어치를 1~3년 쓰겠다
- 예약 인스턴스 (Reserved Instance) : "이 특정 사양의 인스턴스를 1~3년 쓰겠다" 고 약정

---

# 인스턴스 스토어(Instance Store) 
- EC2 인스턴스에 물리적으로 붙어 있는 임시 저장 공간
- 임시(휘발성) 스토리지입니다. 인스턴스를 중지하거나 종료하면 데이터가 사라집니다.
-  "사라져도 상관없는 빠른 임시 저장"이 필요할 때 유용합니다.

---

# Glacier Instant Retrieval
- "즉시 접근 필요(밀리초) + 가끔 사용"

---

# Glacier Flexible Retrieval
- "몇 분~몇 시간 지연 허용" 

---

# Systems Manager 기능 구분
- "여러 EC2에 즉시·일괄 명령/스크립트 실행 (타사 SW 패치를 빠르게)" → Run Command
- "OS·소프트웨어 정기 패치 자동 관리" → Patch Manager (일정 기반, OS 중심)
---

# S3 Object Lock 
-  S3 객체를 일정 기간/영구적으로 삭제·수정 불가하게 잠그는 기능 (WORM 방식)
  - 모드: Governance(특별 권한자는 가능) / Compliance(누구도 불가, 엄격)

---

# VPC 피어링
- 다른 VPC를 연결하는 기능


---
# VPC, 서브넷, 보안그룹 구조
- VPC      : 네트워크 가장 큰 틀 (예: 10.0.0.0/16)
- AZ       : 각각의 가용 영역 (물리적 데이터센터, 고가용성용)
- 서브넷    : 네트워크를 용도별로 조갠 것 (퍼블릭/프라이빗/DB), 하나의 AZ에 속함
- 보안그룹  : 각 인스턴스(EC2·RDS)에 붙는 방화벽 (IP·포트 허용 규칙, allow만)
- NACL     : 서브넷 단위 방화벽 (allow + deny) ← 보안 그룹과 구분
  - 트래픽은 NACL을 먼저 통과한 뒤, 보안 그룹을 통과해야 인스턴스에 도달합니다. 두 겹의 방어선
```text
VPC (10.0.0.0/16)
│
├── AZ-a
│   ├── [NACL] 퍼블릭 서브넷  ─ EC2(웹) [SG(보안그룹): Apple]
│   ├── [NACL] 프라이빗 서브넷 ─ EC2(앱) [SG: Banana]
│   └── [NACL] DB 서브넷      ─ RDS     [SG: Lemon]
│
└── AZ-b
├── 퍼블릭 서브넷
├── 프라이빗 서브넷
└── DB 서브넷
```

---

# AWS Certificate Manager (ACM) 
- SSL/TLS 인증서 발급·저장·관리
- HTTPS 통신을 위한 인증서를 제공
- 인증서 자동 갱신
- CDN을 연결할 경우 ACM의 리전은 무조건 "us-east-1"에 있어야 한다 -> 글로벌 서비스 이기 때문
- API GateWay를 사용해서 연결할 경우 API가 **존제하는 같은 리전**에 있어야한다.

---
# AWS AI 관리형 서비스 구분
- "이미지·동영상 분석 (객체·얼굴·부적절 콘텐츠 감지)" → Amazon Rekognition ← 이번 문제
- "텍스트(자연어) 분석 (감정·키워드·언어 감지)" → Amazon Comprehend
- "음성 → 텍스트 변환" → Amazon Transcribe
- "텍스트 → 음성 변환" → Amazon Polly
- "번역" → Amazon Translate
- "ML 모델 직접 개발·훈련·배포" → Amazon SageMaker (개발 노력 큼)

---

# Fargate
- ECS 또는 EKS와 함께 사용해야함 (오케스트라 서비스)
---

# App Runner
- 컨테이너 이미지만으로 서버를 구동 가능함
- GCP의 Cloud Run와 비슷함
- App Runner는 주로 웹/HTTP API에 특화

---

# 하이브리드 Windows 파일 스토리지):

- "Windows 파일 + 온프레미스·AWS 양쪽 최소 지연 접근" → FSx for Windows + FSx 파일 게이트웨이 ← 이번 문제
- FSx 파일 게이트웨이 = 온프레미스에 두는 로컬 캐시 (온프레미스에서 FSx에 빠르게 접근)
- "Windows 파일 공유(SMB) 유지" → FSx (S3·S3 게이트웨이는 객체 스토리지라 부적합)
- "Linux/NFS" → EFS
---

# SQS 중복 처리 문제
- "SQS 큐엔 중복 없는데 처리 결과(RDS 등)에 중복 발생" → 원인은 가시성 제한 시간(Visibility Timeout)이 너무 짧음
  - ex) 진햏시간이 너무 오래 걸려서 커밋이 안돼 었던것임
- 표준 큐: 빠르고 무제한 확장 // 대신 → 순서 보장 X, 중복 전달 가능성 O
- 중복이 없으려면 SQS FIFO 사용 필요


---
# DynamoDB "Point-in-Time Recovery" (PITR)
- DynamoDB 테이블을 과거의 특정 시점으로 복원하는 기능
- 지난 35일 내 어느 시점이든 복구 가능, 그리고 최근 5분 단위까지 세밀하게 복구
- "문제 내 데이터 손상 직전 시점으로 되돌리기"에 적합

---
# VPC에 붙는 게이트웨이 종류

게이트웨이역할 (어디로 나가는 문인가)인터넷 게이트웨이 (IGW)VPC ↔ 인터넷 연결하는 문NAT 게이트웨이프라이빗 서버가 인터넷으로 나가는 문 (나가기 전용)VPC 엔드포인트 (게이트웨이 타입)VPC ↔ S3·DynamoDB 를 인터넷 없이 직통 연결하는 문가상 프라이빗 게이트웨이 (VGW)VPC ↔ 온프레미스(VPN) 연결하는 문

---
# 배스천 호스트(Bastion Host)
- 프라이빗 서브넷의 서버에 접속하기 위한 "중간 다리(징검다리) 서버" 입니다. 점프 서버(Jump Server) 라고도 부름
- 같은 VPC 내부 통신은 **"프라이빗 IP"** 로 이뤄짐

---

# AWS DataSync
- 온프레미스 ↔ AWS 간 대량의 파일 데이터를 빠르고 안전하게 전송하는 서비스 (S3, EFS 등으로). JSON 같은 파일 전송에 적합

---

# AWS Backup

- 여러 AWS 서비스(DynamoDB 포함)의 백업을 중앙에서 자동 관리하는 서비스
- 백업 일정(언제 백업) 과 보존 정책(얼마나 보관) 을 설정만 하면 → 알아서 백업·보관·만료 처리
- 7년 보관 정책도 정책 설정 한 번으로 가능 → 운영 오버헤드 최소
  - PITR(지정 시간 복구)은 최근 35일까지만 복구 가능합니다.

---

# DynamoDB의 두 용량 모드:

- 온디맨드(On-Demand) = 사용한 만큼만 과금, 트래픽에 따라 자동으로 즉시 확장/축소. 용량을 미리 정할 필요 없음
- 프로비저닝(Provisioned) = **처리 용량을 미리 지정**, 그만큼 비용 발생

---

# SNS
- 알림을 뿌리고 끝이지 작업을 보관·처리
- 데이터를 저장하고 있지 않음 (저장은 SQS)

---
# S3 Requester Pays(요청자 지불)
- 데이터를 공유하는데 다운로드/전송 비용을 데이터 받는 쪽이 내게 하고 싶을 때 사용 (비용 절감 가능)

---

# S3 교차 리전 복제의 장점:

- 재해 복구 — 한 리전 장애 시 다른 리전 복제본으로 보호
- 지연 감소 — 여러 지역 사용자가 가까운 리전에서 빠르게 접근
- 규정 준수 — 특정 지역 보관 요건 충족
- 데이터 지역화 — 지역별 작업 효율

- 단점/주의: 데이터를 복사하므로 전송·저장 비용 발생 → "비용 최소화"가 핵심이면 불리

---

# S3 특징
- S3는 서브넷에 속하지 않음
- VPC·서브넷 밖의 리전 단위 서비스
-  S3 게이트웨이 엔드포인트(S3 Gateway VPC Endpoint)를 사용하여 프라이빗 망으로 통신 가 대기 인스턴스

---

# 대기 인스턴스
- 평소에는 아무 일도 안 하고, 장애가 났을 때만 대신 일하려고 대기하는 예비 인스턴스
  - 평소에는 직접 접근·사용 불가 (오직 장애 대비용)
- Multi-AZ 배포의 예비 DB 인스턴스. 평소엔 대기만 하고, 장애 시 자동으로 기본으로 승격


---

#  AWS Glue
- AWS Glue = AWS의 완전관리형 ETL 서비스입니다. 위에서 본 ETL 작업을 서버 관리 없이(서버리스) 자동으로 해주는 서비스예요.
## Glue가 하는 일

- 대규모 데이터(GB~TB) ETL 작업을 자동 실행 → 데이터 추출 → 변환 → 적재를 코드/설정으로 수행
  - 추출 -> 변환 -> 적재
- 서버리스 → 서버를 직접 관리할 필요 없음 (AWS가 알아서 처리)
- 데이터 카탈로그 → 데이터가 어디에 어떤 형식으로 있는지 자동으로 파악·정리

---

# 대규모 DDoS 방어 + 무중단 이 필요할 경우
- Shield Advanced(전문 DDoS 방어) + CloudFront(트래픽 분산·흡수) 
  - CloudFront는 DDoS 공격 트래픽이 엣지에서 흡수·분산되어 원본 서버(EC2)에 직접 도달하는 부담을 줄임
---

# Lambda 기준 정책 종류 → "방향"으로 결정

- "남이 Lambda를 호출"(들어옴) → 리소스 기반 정책
- "Lambda가 남에게 접근"(나감) → 실행 역할

---

# 미리 서명된 URL(Presigned URL)
- "이 URL을 가진 사람은, 정해진 시간 동안, S3에 파일을 올릴(또는 받을) 수 있다"는 임시 허가가 담긴 특별한 URL입니다.
- 임시 권한이 서명되어 들어있는 URL
- 사용하면 EC3를 거치지 않고 바로 S3에 파일이 등록되기에 부하를 줄일 수 있음

---
# CloudFront
- CloudFront는 별도로 인증서를 안 가져와도, 기본적으로 HTTPS를 쓸 수 있음
  - 다만 도메인을 지정해서 쓰고 싶으면 ACM 필요

---

# CloudWatch Logs
- AWS 리소스와 애플리케이션의 "로그"를 모아서 저장·관리하는 서비스입니다. (단순 관리 저장)
-  로그를 다른 대상으로 실시간 스트리밍하는 구독(Subscription) 기능이 내장되어 있고, OpenSearch로의 전송을 기본 지원

---
# AWS Global Accelerator
- "여러 리전의 NLB로 최적 라우팅 + 성능·가용성 + 비-HTTP(TCP/UDP)"
- 여러 리전 엔드포인트(NLB 등)를 묶어 최적 경로 라우팅, TCP/UDP·NLB와 통합, 고정 IP

---

# Amazon OpenSearch Service
- 대량의 데이터(특히 로그)를 빠르게 검색·분석하고 시각화하는 서비스
- OpenSearch에 로그를 "저장"한다 = 검색·분석할 수 있도록 OpenSearch 안에 넣는다(진짜로 로그 데이터를 여기에 다시 저장)

---

# RDS 암호화
- "기존 암호화 안 된 RDS를 암호화" → 암호화된 스냅샷을 복원해 새 인스턴스 생성 후 교체
- RDS는 생성 후 암호화를 켤 수 없음 → 반드시 "스냅샷 암호화 → 복원(새 인스턴스)" 경로

---

# ACM의 SSL 종료
- EC2 에서 SSL 처리는 올바르지 못한 방법 ALB에서 해주자

---

# 저장소 I/O 포퍼먼스가 가장 중요 (날라가도 괜찮을 경우)
- EBS보다 -> EC2 Instance Store가 더 빠릅니다.

---

# AutoScaling의 Target Tracking Scaling(대상 추적)
- 일정 CPU자원에 맞춰 가장 잘 실행되는 경우 사용
```text
CPU가 50% → EC2 추가
CPU가 38% → 그대로 유지
CPU가 25% → EC2 감소
```

---

# Cloud Front를 사용 S3 URL 직접 접근 차단
- S3를 Private으로 두고 OAI/OAC를 통해서만 접근 허용

---

#Global Accelerator
-> 네트워크 경로를 최적화한다.
-> S3 와 CloudFront 는 Endpoint로 사용이 불가능해
-> UDP / 게임 / 음성

---
#Firewall Manager

- 방화벽이 아니다

- 여러 계정의
  ㄴ>Network Firewall
  ㄴ>WAF
  ㄴ>Security Group

정책을 중앙에서 관리하는 서비스

---
# Role, Policy
- Role 에 Policy를 붙이는 개념
- 그래서 S3나 EC2에도 Role을 사용해서 접근 권한을 컨트롤 하는것임
---
# AWS SAA에서는 다음 문장이 나오면 거의 Gateway Load Balancer를 선택하면 됩니다.

Virtual Firewall
Firewall Appliance
AWS Marketplace Appliance
IDS / IPS
Traffic Inspection
Deep Packet Inspection
Transparent Insertion

즉,

"타사 방화벽 장비를 AWS 네트워크 경로에 자연스럽게 삽입해야 한다."

---

# cloudWatch 와 CloudTrail 차이
- CloudWatch = 시스템을 모니터링하는 서비스
- CloudTrail = AWS 계정 활동(API 호출)을 감사(Audit)하는 서비스

---
# Shield Advanced

유료 서비스이며

대규모 DDoS 공격에 대해

더 강력한 보호
탐지
대응 지원(DRT)
상세한 공격 분석

을 제공

---
# AWS System Manager Session Manager
- SSH Key 없이 접속
- 22 Port 제거
- 최소 운영 오버헤드
- Well-Architected

---

# RDS Custom
- OS 접근이 가능한 DB
  - 여기서 말하는 OS 접근은 DB 서버 자체에 ssh 로 접근하여 설정 파일을 변경하거나 추가적인 툴을 설치할 수 있는 것

---

# AWS PrivateLink
- 다른 VPC(또는 다른 AWS 계정)의 특정 서비스 **하나를** 프라이빗하게 연결하는 기술