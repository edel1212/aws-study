# AWS SAA-C03 합격 요약 노트

> 시험 키워드 → 정답 매핑 중심 / 모바일·웹에서 빠르게 훑어보는 용도

## 목차
1. [시험 키워드 빠른 매칭표](#1-시험-키워드-빠른-매칭표-최우선-암기)
2. [컴퓨팅](#2-컴퓨팅-compute)
3. [스토리지](#3-스토리지-storage)
4. [데이터베이스](#4-데이터베이스-database)
5. [네트워킹 & 콘텐츠 전달](#5-네트워킹--콘텐츠-전달)
6. [보안 & 자격증명](#6-보안--자격증명)
7. [메시징 & 통합](#7-메시징--통합)
8. [분석 & AI/ML](#8-분석--aiml)
9. [관리 & 모니터링](#9-관리--모니터링)
10. [비용 관리](#10-비용-관리)
11. [재해 복구 & 마이그레이션](#11-재해-복구--마이그레이션)

---

## 1. 시험 키워드 빠른 매칭표 (최우선 암기)

### 네트워킹 키워드
| 키워드 | 정답 |
|---|---|
| 정적/동적 콘텐츠 캐싱, 웹/HTTP, S3 가속 | **CloudFront** |
| 고정 IP, 비-HTTP(게임·IoT·UDP), 글로벌 라우팅 | **Global Accelerator** |
| third-party appliance / Firewall Appliance / IDS·IPS / Deep Packet Inspection / Transparent Insertion | **Gateway Load Balancer** |
| 온프레미스 ↔ AWS 전용 회선 (인터넷 우회) | **Direct Connect** |
| VPC ↔ S3/DynamoDB 프라이빗 직통 | **VPC Gateway Endpoint** |
| 다른 VPC의 특정 서비스 하나만 프라이빗 연결 | **PrivateLink** |
| 여러 VPC 간 사설 통신 | **VPC Peering** |
| 여러 리전 NLB 최적 라우팅 + TCP/UDP | **Global Accelerator** |

### 보안 키워드
| 키워드 | 정답 |
|---|---|
| VPC 트래픽 실제 검사·차단 | **Network Firewall** |
| 여러 계정 방화벽 규칙 중앙 관리 | **Firewall Manager** |
| 위협 탐지 (알림만, 차단 X) | **GuardDuty** |
| 웹앱 보호 (SQLi, XSS 등 L7) | **WAF** |
| DDoS 방어 전용 | **Shield** (Standard 무료 / Advanced 유료) |
| EC2·컨테이너 보안 취약점(CVE) 스캔 | **Inspector** |
| S3의 PII·민감정보 ML 자동 탐지 | **Macie** |
| API 호출/활동 감사 로그 | **CloudTrail** |
| 리소스 구성 변경 추적·규정 준수 | **Config** |
| 모범 사례 권장 체크리스트 | **Trusted Advisor** |

### 스토리지 키워드
| 키워드 | 정답 |
|---|---|
| 예측 불가 액세스 + 자동 비용 최적화 | **S3 Intelligent-Tiering** |
| 자주 접근 | **S3 Standard** |
| 가끔 접근 + 다중 AZ | **S3 Standard-IA** |
| 가끔 접근 + 단일 AZ 허용 + 최저 비용 | **S3 One Zone-IA** |
| 즉시 접근(ms) + 가끔 사용 | **Glacier Instant Retrieval** |
| 몇 분~몇 시간 지연 허용 | **Glacier Flexible Retrieval** |
| 장기 보관(12h+) + 최저 비용 | **Glacier Deep Archive** |
| 복제 시간 최소화 + 즉시 고I/O + 프로덕션 영향 X | **EBS 스냅샷 + FSR** |
| 사라져도 OK + 최고 I/O 성능 | **EC2 Instance Store** |
| 원거리에서 대용량 업로드 | **S3 Transfer Acceleration + Multipart Upload** |
| Windows 파일(SMB) + 온프레미스·AWS 양쪽 접근 | **FSx for Windows + FSx File Gateway** |
| Linux/NFS 공유 | **EFS** |
| WORM 잠금 (삭제·수정 불가) | **S3 Object Lock** |
| 다운로드 비용을 받는 쪽이 부담 | **S3 Requester Pays** |

### 메시징/스트리밍 키워드
| 키워드 | 정답 |
|---|---|
| 여러 시스템에 이벤트 팬아웃 | **SNS + SQS** |
| 작업 큐 / 비동기 디커플링 | **SQS** |
| 실시간 수집 + 여러 소비자 + 직접 제어 | **Kinesis Data Streams** |
| S3 등에 자동 적재 (관리 거의 X) | **Kinesis Data Firehose** |
| 스트리밍 데이터 실시간 분석 엔진 | **Managed Service for Apache Flink** |
| AWS 서비스 이벤트 감지·라우팅 | **EventBridge** |
| 정의된 워크플로 + 중앙에서 진행 상태 추적 | **Step Functions** |
| 여러 마이크로서비스 오케스트레이션 (상태 머신) | **Step Functions** |
| SaaS(Salesforce, Slack 등) ↔ AWS 데이터 통합 | **AppFlow** |
| Kafka 관리형 | **MSK** |

### DB/컴퓨팅 키워드
| 키워드 | 정답 |
|---|---|
| 읽기 복제본 자동 확장 | **Aurora** |
| Lambda + DB 연결 수 폭주 (too many connections) | **RDS Proxy** |
| OS 접근 가능한 DB | **RDS Custom** |
| DynamoDB 과거 시점 복구 (35일 내, 5분 단위) | **PITR (Point-in-Time Recovery)** |
| 컨테이너 이미지만으로 웹/HTTP API 서버 | **App Runner** |
| ECS/EKS 서버리스 컴퓨팅 | **Fargate** |
| 여러 EC2에 즉시 일괄 명령 | **SSM Run Command** |
| OS·SW 정기 패치 자동화 | **SSM Patch Manager** |
| SSH 키 없이 EC2 접속 (22 포트 X) | **SSM Session Manager** |
| Hadoop/Spark 빅데이터 클러스터 | **EMR** |
| 서버리스 ETL | **Glue** |
| S3 데이터 SQL 쿼리 (서버리스) | **Athena** |

---

## 2. 컴퓨팅 (Compute)

### Lambda
- **서버리스 코드 실행** 서비스 (API 전용 아님 — 이벤트 기반 코드 실행 전반)
- 최대 실행 시간 **15분** → 장시간 작업은 ECS/Fargate
- 최대 메모리  : 10GB
- 트리거: S3 업로드, API Gateway, EventBridge, SNS, SQS 등
- **권한 정책 방향**
    - 남이 Lambda를 호출 (들어옴) → **리소스 기반 정책**
    - Lambda가 남에게 접근 (나감) → **실행 역할(Execution Role)**

### EC2 요금 옵션 4가지
| 방식 | 특징 | 언제 |
|---|---|---|
| **On-Demand** | 약정 X, 쓴 만큼, 단가 높음 | 예측 불가·단기·테스트 |
| **Reserved Instance** | 1~3년 약정 → 큰 할인 | 꾸준한 장기 사용 |
| **Savings Plans** | 시간당 $XX 사용량 약정 → 유연 | RI보다 유연 (Lambda, Fargate 포함) |
| **Spot** | 남는 용량, 최대 90% 할인, 중단 가능 | 배치 등 중단 허용 작업 |

**주의 (수정 포인트)**: 예약 인스턴스는 **EC2 전용이 아님** — EC2, RDS, ElastiCache, Redshift, OpenSearch에서 모두 제공. 단, **Fargate·Lambda는 RI 적용 불가** → Savings Plans 사용.

### Instance Store
- EC2에 물리적으로 붙은 **임시(휘발성)** 스토리지
- 인스턴스 중지/종료 시 데이터 사라짐
- **EBS보다 빠름** → "사라져도 OK + 최고 I/O" 키워드에서 정답

### Fargate vs App Runner
| | Fargate | App Runner |
|---|---|---|
| 사용처 | ECS/EKS와 함께 (오케스트레이션 필요) | 컨테이너 이미지만으로 바로 |
| 특화 | 광범위 워크로드 | 웹/HTTP API |
| 비교 | EKS의 서버리스 | GCP Cloud Run과 유사 |

---

## 3. 스토리지 (Storage)

### EBS vs S3 vs EFS
| 서비스 | 비유 | 핵심 |
|---|---|---|
| **EBS** | EC2에 붙이는 SSD | 블록 스토리지, 단일 EC2 (io2는 Multi-Attach 가능) |
| **S3** | 무제한 파일 저장소 | 객체 스토리지, **리전 서비스(서브넷 X)**, 정적 파일용 |
| **EFS** | 공유 폴더 | NFS, Linux 전용, 다중 AZ 자동 |

> ⚠️ S3는 정적 파일용. **트랜잭션·동적 처리에 부적합** (주문 DB로 쓰면 안 됨)

### EBS 스냅샷
- 시점 기준 S3에 증분 백업 (변경 블록만)
- **Fast Snapshot Restore (FSR)**: 복원 즉시 일관된 고I/O 보장
- 출제 신호: "복제 시간 최소화 + 즉시 고I/O + 프로덕션 영향 없음" → **스냅샷 + FSR**

### S3 스토리지 클래스
| 클래스 | 특징 |
|---|---|
| Standard | 자주 접근, 다중 AZ |
| Intelligent-Tiering | 액세스 패턴 모를 때, 자동 계층 이동 |
| Standard-IA | 가끔 접근, 다중 AZ |
| One Zone-IA | 가끔 접근, **단일 AZ**, 최저 비용 (복원력 ↓) |
| Glacier Instant Retrieval | 밀리초 + 가끔 사용 (아카이브 중 가장 빠름) |
| Glacier Flexible Retrieval | 분~시간 단위 복원 (구 Glacier) |
| Glacier Deep Archive | 12시간+ 복원, 최저 비용 |

### S3 보안/잠금
- **Object Lock** (WORM 잠금) — **버전 관리 ON 필수 (세트)**
    - **Governance**: 특별 권한자(`s3:BypassGovernanceRetention`)는 우회 가능
    - **Compliance**: 루트 사용자도 우회 불가, 엄격
- **Presigned URL**: 임시 권한 서명된 URL → EC2 거치지 않고 S3에 직접 업/다운로드 (부하 감소)
- **OAI/OAC**: S3를 Private으로 두고 CloudFront 경유만 허용 (S3 URL 직접 접근 차단)
- S3는 **보안 그룹 못 붙임** (SG는 VPC 리소스 전용) → IAM/버킷 정책으로 제어

### S3 암호화 (SSE)
| 종류 | 키 관리 |
|---|---|
| **SSE-S3** | S3가 전부 관리 (가장 간단) |
| **SSE-KMS** | KMS 키 사용 (권한·순환·감사 제어) |
| **SSE-C** | 사용자가 키 직접 제공 |

### S3 교차 리전 복제 (CRR)
- 장점: 재해 복구, 지연 감소, 규정 준수, 데이터 지역화
- 단점: **전송·저장 비용 발생** → "비용 최소화" 키워드면 오답

### Storage Gateway 4종류
| 종류 | 용도 |
|---|---|
| **S3 File Gateway** | NFS/SMB 파일을 S3에 |
| **FSx File Gateway** | 파일을 FSx(Windows)에 (온프레미스 로컬 캐시) |
| **Volume Gateway** | 블록(iSCSI)을 클라우드에 백업 |
| **Tape Gateway** | 가상 테이프로 백업·아카이브 |

### AWS DataSync vs Snowball
- **DataSync**: 온프레미스 ↔ AWS 대량 파일 **온라인** 전송 (S3, EFS, FSx 등)
- **Snowball**: 물리 장치로 **일회성/대규모** 마이그레이션 (배송 기반 → 시간 민감한 백업에 부적합)

---

## 4. 데이터베이스 (Database)

### Aurora
- MySQL/PostgreSQL 호환
- Read Replica 최대 15개, Auto Scaling으로 자동 증감
- Multi-AZ 고가용성
- **출제 신호: "읽기 복제본 자동 확장"** → Aurora

### RDS
- **중지(stop) 최대 7일** → 자동 재시작
- 한 달 비가동: **스냅샷 + 인스턴스 삭제 → 다음 달 복원**이 가장 비용 효율적
- **암호화는 생성 후 못 켬** → 스냅샷 → 암호화된 스냅샷 복사 → 새 인스턴스로 복원
- **RDS Custom**: OS 접근 가능 (SSH로 설정 파일 변경, 툴 설치 가능)
- **RDS Proxy**: Lambda + RDS의 "too many connections" 해결 (연결 풀링)

### DynamoDB
- **NoSQL + 트랜잭션 처리 가능 (ACID)**
- **PITR (Point-in-Time Recovery)**: 최근 35일, 5분 단위 복구
- 용량 모드:
    - **On-Demand**: 자동 확장, 사용한 만큼
    - **Provisioned**: 처리 용량 미리 지정
- **DAX**: 마이크로초 단위 인메모리 캐싱

### ElastiCache
- Redis (영속·복제·Pub/Sub) vs Memcached (단순 캐시, 멀티스레드)

### 스토리지 I/O 병목 → Provisioned IOPS SSD (io1/io2)
- 출제 신호: "삽입 작업 느림" + "매일 수백만 건 업데이트" → IOPS SSD로 변경

### 대기 인스턴스 (Standby)
- Multi-AZ 배포의 예비 DB
- 평소 직접 접근·사용 불가, 장애 시 자동 승격

---

## 5. 네트워킹 & 콘텐츠 전달

### VPC 구조
```
VPC (10.0.0.0/16)
└── AZ-a / AZ-b / AZ-c
    ├── 퍼블릭 서브넷  (Web)
    ├── 프라이빗 서브넷 (App)
    └── DB 서브넷      (RDS)
```
- **VPC**: 가장 큰 네트워크 틀
- **AZ**: 물리적으로 분리된 데이터센터 → 다중 AZ = 고가용성
- **서브넷**: VPC를 용도별로 쪼갠 것 (하나의 AZ에 속함)
- **보안 그룹(SG)**: 인스턴스 단위 방화벽, **allow만**, stateful
- **NACL**: 서브넷 단위 방화벽, **allow + deny**, stateless
    - 트래픽 흐름: NACL → SG → 인스턴스 (이중 방어)

### VPC 게이트웨이 종류
| 종류 | 역할 |
|---|---|
| **Internet Gateway (IGW)** | VPC ↔ 인터넷 양방향 통로 |
| **NAT Gateway** | 프라이빗 서버의 **나가는 길 전용** (외부 시작 연결 차단) |
| **VPC Endpoint (Gateway)** | VPC ↔ S3/DynamoDB 인터넷 우회 |
| **VPC Endpoint (Interface) / PrivateLink** | 다른 VPC의 특정 서비스 하나 프라이빗 연결 |
| **Virtual Private Gateway (VGW)** | VPC ↔ 온프레미스 (VPN) |

### NAT vs IGW
| | IGW | NAT |
|---|---|---|
| 역할 | VPC의 인터넷 입구 | 프라이빗의 나가는 길 중계 |
| 위치 | VPC에 붙음 | 퍼블릭 서브넷에 위치 |
| 들어오는 요청 | 통과 가능 | **차단** |

### Direct Connect
- 온프레미스 ↔ AWS **전용 회선**
- 인터넷 우회 → 빠르고 일관된 대역폭
- 백업 트래픽을 전용선으로 분리 → 내부 인터넷 회선 영향 없음

### 배스천 호스트 (Bastion / Jump Server)
- 프라이빗 서브넷 서버 접속용 중간 다리
- 같은 VPC 내부 통신은 **프라이빗 IP**로

### ELB 4가지 종류
| 종류 | 계층 | 용도 |
|---|---|---|
| **ALB** | L7 (HTTP/S) | URL·경로·호스트 기반 라우팅 |
| **NLB** | L4 (TCP/UDP) | 초고성능, 저지연, 고정 IP |
| **GWLB** | L3 (IP 패킷) | 타사 보안 어플라이언스 통합 |
| **CLB** (Classic) | L4/L7 | 레거시 |

### Gateway Load Balancer (출제 단골)
- 타사 가상 어플라이언스(방화벽/IDS/IPS) 통합 전용
- GWLB 엔드포인트로 IP 패킷을 어플라이언스에 보내 검사 후 되돌림
- **출제 트리거 단어**: third-party appliance, Firewall Appliance, AWS Marketplace Appliance, IDS/IPS, Traffic Inspection, Deep Packet Inspection, Transparent Insertion

### CloudFront
- **기본 HTTPS** 사용 가능 (`*.cloudfront.net`)
- 커스텀 도메인 HTTPS 사용 → **ACM 필요 (반드시 us-east-1)**
- Shield Advanced와 결합 시 DDoS 트래픽 엣지에서 흡수

### Global Accelerator
- 네트워크 경로 최적화, 고정 IP
- **여러 리전의 NLB**로 최적 라우팅
- TCP/UDP, 게임/음성/IoT
- S3·CloudFront는 엔드포인트로 사용 **불가**

### ACM (AWS Certificate Manager)
- SSL/TLS 인증서 발급·저장·자동 갱신
- **CloudFront에 사용 시: 반드시 us-east-1**
- API Gateway에 사용 시: API와 같은 리전
- **SSL 종료는 ALB에서** (EC2에서 직접 처리 X)

---

## 6. 보안 & 자격증명

### IAM 권한 부착 규칙
| 대상 | 정책 부착 | 그룹 소속 | 비고 |
|---|---|---|---|
| **Group** | ⭕ | — | Role은 그룹에 못 넣음 |
| **User** | ⭕ | ⭕ | 그룹 통해 권한 상속 |
| **Role** | ⭕ | ❌ | 서비스/사용자가 Assume |
| **EC2 등 서비스** | Role 부착 ⭕ | 정책 직접 X | 반드시 Role 경유 |

> **Role에 Policy를 붙이는 개념** — S3·EC2 등에도 Role을 통해 권한 부여

### 방화벽/보안 서비스 구분
| 키워드 | 서비스 |
|---|---|
| VPC 트래픽 실제 검사·차단 | **Network Firewall** |
| 여러 계정 정책 중앙 관리 (NF/WAF/SG) | **Firewall Manager** (방화벽 자체 X, 관리 도구) |
| 위협 탐지·알림 (차단 X) | **GuardDuty** |
| L7 웹앱 보호 (SQLi, XSS) | **WAF** (ALB·CloudFront·API GW 지원, **NLB 직접 연결 X**) |
| DDoS 방어 | **Shield** |

### Shield
- **Standard**: 무료, 자동, 일반 DDoS
- **Advanced**: 유료, 대규모·고도화 DDoS, 24/7 DRT 대응, 비용 보호
- 대규모 DDoS + 무중단 → **Shield Advanced + CloudFront**

### KMS
- 암/복호화 키 관리 (복호화도 가능)
- S3·EBS·RDS 암호화에 광범위 사용

### Secrets Manager
- DB 자격증명·API 키 관리
- **자동 로테이션** (Parameter Store에는 없음)

### IAM Identity Center + AD 트러스트
| 상황 | 정답 |
|---|---|
| Organizations + 다중 계정 SSO | **IAM Identity Center** |
| 온프레미스 AD 계속 사용 | **AWS Managed Microsoft AD** |
| 양쪽 사용자/그룹 유지 | **Bidirectional Forest Trust 필수** |

### aws:PrincipalOrgID
- IAM 조건 키
- S3 버킷 정책 등에서 "Organization 소속 계정만 접근 허용"
- 새 계정 추가 시 정책 수정 불필요

### Inspector vs Macie
- **Inspector**: EC2/ECR/Lambda 보안 취약점(CVE) 자동 스캔
- **Macie**: S3의 PII·민감정보 ML 자동 탐지

### Systems Manager (SSM)
| 기능 | 용도 |
|---|---|
| **Session Manager** | SSH 키 없이 EC2 접속, 22번 포트 제거, 최소 오버헤드 |
| **Run Command** | 여러 EC2에 즉시 일괄 명령/스크립트 |
| **Patch Manager** | OS·SW 정기 패치 자동화 (일정 기반) |
| **Parameter Store** | 설정값·시크릿 저장 (Secrets Manager의 가벼운 버전) |

---

## 7. 메시징 & 통합

### SQS
- 작업 큐 / 비동기 디커플링
- **Standard**: 빠름, 무제한 확장, 순서 보장 X, 중복 가능
- **FIFO**: 순서 보장 + 정확히 한 번 처리
- **출제 함정 "큐엔 중복 없는데 처리 결과에 중복"** → 원인: **Visibility Timeout이 너무 짧음** (처리가 끝나기 전 다른 컨슈머가 다시 가져감)

### SNS
- 알림 발행/구독 (Pub/Sub)
- **데이터 저장 X** (저장은 SQS)
- SNS + SQS 패턴 = 여러 시스템 팬아웃

### EventBridge
- AWS 서비스 이벤트 감지 → 규칙에 따라 라우팅 (SNS, Lambda 등)
- 스키마·필터링·SaaS 통합 강점

### Step Functions (★ 자주 출제)
- **시각적 상태 머신(State Machine)** 으로 워크플로를 정의·실행
- 여러 서비스(Lambda, ECS, SNS, SQS, DynamoDB 등)를 **중앙에서 조율**
- 여러 작업으로 구성된 작업에 적합
- 현재 어느 단계에 있는지 **시각적으로 추적** 가능, 에러 처리·재시도 내장
- 두 가지 워크플로:
    - **Standard**: 최대 1년 실행, 정확히 한 번 실행, 장기/감사 필요 워크플로
    - **Express**: 최대 5분, 고처리량, 비용 효율 (IoT·스트리밍 처리)

### Step Functions vs EventBridge (★★ 시험 핵심)
| 구분 | Step Functions | EventBridge |
|---|---|---|
| 패턴 | **오케스트레이션 (Orchestration)** | **코레오그래피 (Choreography)** |
| 비유 | 악단 지휘자 (중앙 제어) | 라디오 방송 (각자 듣고 반응) |
| 흐름 제어 | 정의된 순서대로 단계별 진행 | 이벤트 발생 → 구독자가 알아서 처리 |
| 상태 추적 | **중앙에서 한눈에 가능** | 각 서비스가 독립적 → 전체 추적 어려움 |
| 에러 처리 | 내장 (재시도·Catch·롤백) | 각 컨슈머가 알아서 |
| 적합한 경우 | 주문 처리(접수→결제→재고→배송) 같은 **정해진 워크플로** | 느슨하게 결합된 이벤트 기반 시스템 |

> **출제 트리거**:
> - "정의된 워크플로" + "중앙에서 추적" → **Step Functions**
> - "여러 마이크로서비스를 순서대로 조율" → **Step Functions**
> - "이벤트를 여러 시스템에 분산·라우팅" → **EventBridge**

### Kinesis Data Streams vs Firehose
| | Kinesis Data Streams | Kinesis Data Firehose |
|---|---|---|
| 특징 | 컨베이어 벨트 (직접 처리) | 자동 택배 (자동 적재) |
| 지연 | 거의 실시간 (ms) | 거의 실시간 (60초~) |
| 소비자 | 여러 소비자, 직접 제어 | 목적지 자동 배달 (S3 등) |
| 관리 | 샤드 관리 필요 | 거의 관리 X |
| 저장 | DB 아님 — 통로 (기본 24h, 최대 365일) | 자동 적재 |

### Managed Service for Apache Flink
- 스트리밍 데이터 **실시간 분석 엔진**
- 구 Kinesis Data Analytics

### MSK (Managed Streaming for Kafka)
- 관리형 Kafka

### AppFlow
- SaaS(Salesforce, Slack, Google Analytics 등) ↔ AWS 데이터 통합
- 코드·서버 관리 없이 자동

---

## 8. 분석 & AI/ML

### Athena
- 서버리스 SQL 쿼리 (S3 데이터 직접)
- 쿼리한 데이터양만큼 과금

### QuickSight
- BI 시각화·대시보드
- ⚠️ **대시보드는 IAM 역할이 아니라 QuickSight 사용자/그룹에게 공유**

### AWS Glue
- 대규모 배치 ETL(Extract → Transform → Load)을 위한 서버리스 서비스
- 클러스터 시작 시간(수 분) 걸림
- Data Catalog로 데이터 위치·형식 자동 정리
- 언어 (사실상 둘의 차이는 크게 없음)
  - Scala : 기본 값
  - PySpark : 파이썬을 사용 병렬처리에 더 우수

### EMR
- TB~PB급 빅데이터 처리용 클러스터 서비스
- 직접 관리하는 Spark/Hadoop 빅데이터 클러스터
- **Instance Fleet + Spot** 조합이 비용 효율 (자주 출제)

### OpenSearch Service
- 대량 로그 검색·분석·시각화
- 로그 저장·검색에 사용
- CloudWatch Logs → OpenSearch 구독 기본 지원

### AWS AI 관리형 서비스
| 키워드 | 서비스 |
|---|---|
| 이미지·동영상 분석 (객체·얼굴·부적절 콘텐츠) | **Rekognition** |
| 텍스트 분석 (감정·키워드·언어) | **Comprehend** |
| 음성 → 텍스트 | **Transcribe** |
| 텍스트 → 음성 | **Polly** |
| 번역 | **Translate** |
| 챗봇 | **Lex** |
| ML 직접 개발·훈련·배포 | **SageMaker** (개발 노력 큼) |

---

## 9. 관리 & 모니터링

### CloudWatch vs CloudTrail
| | CloudWatch | CloudTrail |
|---|---|---|
| 역할 | 시스템 **모니터링** (메트릭·로그·알람) | AWS API 호출 **감사** (누가 무엇을) |
| 데이터 | 성능·상태 | 활동 이력 |

### CloudWatch Logs
- 로그 수집·저장·관리
- **Subscription**으로 실시간 스트리밍 (OpenSearch 기본 지원)

### AWS 점검/감사 서비스
| 키워드 | 서비스 |
|---|---|
| 리소스 구성 변경 추적·규정 준수 | **Config** |
| 모범 사례(비용·보안·성능) 체크리스트 | **Trusted Advisor** |
| EC2/컨테이너 취약점 스캔 | **Inspector** |
| API 호출 감사 | **CloudTrail** |
| 위협 탐지 | **GuardDuty** |
| S3 민감정보 탐지 | **Macie** |

### Tag
- AWS 리소스에 붙이는 **Key=Value 라벨**
- 비용 할당, 권한 제어(ABAC), 자동화 필터에 활용

### Auto Scaling
- **Target Tracking**: 특정 메트릭(CPU 50% 등) 기준 자동 증감 → 가장 일반적
- **Step Scaling**: 임계값 단계별 증감
- **Scheduled**: 시간 기반
- **Predictive**: ML 예측 기반

---

## 10. 비용 관리

### 비용 분석 도구
| 키워드 | 서비스 |
|---|---|
| 비용 분석·시각화·심층 분석 + 최소 오버헤드 | **Cost Explorer** |
| 예산 설정·초과 알림 | **AWS Budgets** |
| 상세 원시 데이터(라인 아이템) | **CUR (Cost and Usage Report)** (분석엔 QuickSight 등 추가 필요) |
| 간단한 개요 | **Billing 대시보드** |

### 비용 최적화 패턴
- **RDS 1개월 비가동**: 스냅샷 + 인스턴스 삭제 → 다음 달 복원
- **꾸준한 EC2 사용**: Reserved Instance / Savings Plans
- **중단 가능 배치**: Spot
- **데이터 비용 절감**: S3 Requester Pays (받는 쪽이 부담)
- **S3 자동 비용 최적화**: Intelligent-Tiering

---

## 11. 재해 복구 & 마이그레이션

### DR 전략 4가지 (RTO/RPO 빠를수록 비쌈)
| 전략 | RTO | 비용 | 설명 |
|---|---|---|---|
| **Backup & Restore** | 시간~일 | 저렴 | 백업만 두고 장애 시 복원 |
| **Pilot Light** | 분~시간 | 중 | 핵심 시스템만 항상 켜둠 |
| **Warm Standby** | 분 | 높음 | 축소판이 항상 가동 중 |
| **Multi-Site Active/Active** | 거의 0 | 매우 높음 | 두 리전 모두 풀가동 |

### AWS Backup
- 여러 AWS 서비스(DynamoDB, RDS, EBS, EFS 등) 백업 중앙 관리
- 일정·보존 정책 설정만으로 자동화
- 장기 보관(7년 등)도 한 번 설정으로 가능
- DynamoDB PITR과 차이: PITR은 **최근 35일**까지만

### Route 53 라우팅 정책 (참고)
- Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, Multi-value

---

## 부록: 자주 헷갈리는 포인트

### "예약 인스턴스(RI)" 정확히 알기
- **RI 적용 가능**: EC2, RDS, ElastiCache, Redshift, OpenSearch (DynamoDB는 RI-like)
- **RI 적용 불가**: Fargate, Lambda → **Savings Plans** 사용
- **Compute Savings Plans**: EC2 + Fargate + Lambda 통합 할인

### "SSE" 헷갈리지 말기
- **SSE = Server-Side Encryption** (S3 저장 시 자동 암호화)
- SSE-S3 / SSE-KMS / SSE-C 구분

### "Object Lock"과 "버전 관리"는 세트
- Object Lock 사용 = 버전 관리 ON 필수

### "S3는 서브넷에 속하지 않음"
- VPC·서브넷 밖의 **리전 단위 서비스**
- 프라이빗 통신 원하면 → **VPC Gateway Endpoint (S3용)**


@@@@@@@@@@@@@@@@@2

# DynamoDB Streams 
- DynamoDB 테이블의 데이터 변경(INSERT/UPDATE/DELETE)을 순서대로 기록하여 Lambda 등의 서비스가 실시간으로 처리할 수 있도록 하는 변경 이벤트 스트림입니다.

# Amazon DynamoDB Accelerator (DAX)
- DynamoDB 전용 인메모리 캐시

# ACL(Access Control List)
- 허용(Allow)과 거부(Deny) 규칙을 적어 놓은 IP 목록(List) 개념

# NACL(Network Access Control List)
- 네트워크용 ACL (ACL을 실제로 AWS에서 사용한 것)
- 서브넷 앞에서 패킷을 검사합니다.
- NACL은 "서브넷 전체"를 보호 [ex) 건물 앞 경비]
  - 비슷하지만 다른 개념 : Security Group(보안그룹)은 "각 인스턴스"를 보호 [ex) 각각의 집 도어락]
- 순서대로 검사

# Security Group
- "Deny" 규칙이 없음
- Allow만 가능
- "차단 규칙(Deny Rule)" 이라는 표현이 나오면 Security Group은 바로 탈락

# AWS Outposts
- AWS 장비를 회사 데이터센터(온프레미스)에 설치해서 AWS처럼 사용하는 서비스입니다.
- 지연 시간이 매우 짧고 데이터가 절대 외부 유출 되지 않 

# Storage Lens
- S3 버킷의 사용량, 비용, 객체 수, 접근 패턴 등을 분석해 주는 모니터링 서비스

# NLB/ALB 보안 그룹 지원 여부
- ALB : ✅ 가능
- NLB : ❌ NLB 자체엔 직접 적용 불가

# Launch Template 
- EC2 생성 설정서
  - AMI는 어플리케이션 이미지임 서로 다름

# Amazon Elastic Container Registry (ECR)
- 완전관리형 컨테이너 이미지 저장소(레지스트리)
- ECR에 이미지 푸시 → Amazon Inspector가 자동으로 그 이미지를 스캔 (보안 검사를 자동으로 실행 )
- 컨테이너 이미지는 S3 같은 객체 스토리지에 저장하는 게 아니라, ECR 같은 "컨테이너 레지스트리"에 저장하는 게 표준

# Amazon CloudWatch Network Monitor
- AWS와 온프레미스 간의 네트워크 품질(지연 시간, 패킷 손실 등)을 지속적으로 모니터링하는 서비스

# Application Load Balancer(ALB)
- 경로 기반 라우팅 가능 (url path 기반 라우팅)

# Amazon Cognito
- AWS에서 제공하는 로그인(인증) 서비스 -> 회원가입/로그인 시스템을 직접 안 만들어도 되게 해주는 서비스
-  로그인 성공 시 JWT 토큰 발급
- 실제 서버 API에도 쓸 수 있 

# Amazon FSx File Gateway
- 온프레미스 환경에서 S3 또는 FSx에 접근하기 위한 캐시 게이트웨이

#  Amazon FSx for Windows File Server
-  "Windows 기반 애플리케이션" + "SMB 프로토콜" + "안정적인 공유 스토리지"

# AWS Security Token Service (STS)
- 임시 AWS **자격 증명**을 발급하는 서비스
- 임시 권한 부여 = STS + IAM Role


# Lambda 실행 모드
- Reserved Concurrency (프로버저닝된 동시 실 ) : 이 함수가 사용할 최대 동시 실행 개수 제한
- Provisioned Concurrency (예약된 동시 실행): 미리 실행 환경을 준비(빠른 응답과 Cold Start 방지 목적)

# 컴퓨팅 세이브 플랜
- EC2 인스턴스 절약 플랜보다 변경에 자유로움 (인스턴스 유형·크기 변경 가능)
  - EC2 인스턴스 절약 플랜은 인스턴스 유형 변경 없이 고정 사용
- 지원: ✅ EC2, Lambda, Fargate

# EC2 Instance Savings Plans
- 지원: ✅ EC2
- 불가능: ❌ Lambda | ❌ Fargate

# Reserved Instances (예약 인스턴스)
- EC만 사용 가능하다.
- 리전, OS, 인스턴스 패밀리가 고정이다.
- 전환형 RI (Convertible RI)이 존제함
  - OS 및 인스턴스 패밀리 및 크기 변경이 가능한 버전