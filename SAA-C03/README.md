# SAA-C03

---
# 정리 필요 내용
Amazon Athena

S3 버킷에서 S3 전송 가속을 활성화합니다. 멀티파트 업로드를 사용하여 사이트 데이터를 대상 S3 버킷에 직접 업로드
AWS PrincipalOrgID

EBS <-> S3
- EBS = EC2에 붙이는 SSD 하드디스크
- S3 = AWS에서 제공하는 무제한에 가까운 파일 저장소
- EFS = 여러 EC2가 동시에 사용하는 공유 폴더

##
"여러 시스템에 이벤트 전달" → SNS + SQS
"대규모 실시간 스트리밍" → Kinesis / MSK
"작업 큐" → SQS


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