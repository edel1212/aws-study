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

