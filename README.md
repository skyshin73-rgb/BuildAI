# DailyReport - 사내 보안용 로컬 AI 기반 업무 일지 관리 비서

## 프로젝트 개요

**DailyReport**는 사내 폐쇄망 환경에서 보안을 유지하면서 로컬 AI 기술을 활용한 업무 일지 관리 애플리케이션입니다. 외부 인터넷 통신 없이 로컬 PC에서 완전히 독립적으로 동작합니다.

## 주요 특징

✅ **완전한 로컬 환경**: 외부 인터넷 통신 불필요  
✅ **로컬 AI 통합**: Ollama (Llama3 8B / Gemma 2B) 연동  
✅ **임베디드 데이터베이스**: SQLite 또는 H2 사용  
✅ **사용자 친화적 UI**: 타임라인 형식의 업무 일지 관리  
✅ **강력한 검색/필터링**: 날짜별, 키워드별 검색 기능  
✅ **독립형 실행 가능**: .exe 패키징 가능한 구조  

## 기술 스택

| 계층 | 기술 |
|------|------|
| **백엔드** | Java 17 + Spring Boot 3.3.0 |
| **프런트엔드** | HTML5 + CSS3 + Vanilla JavaScript |
| **데이터베이스** | SQLite 3.44.0 (임베디드) |
| **빌드도구** | Maven 3.8.0+ |
| **AI 연동** | Ollama Local API |
| **JPA/ORM** | Spring Data JPA + Hibernate |

## 프로젝트 구조

```
DailyReport/
├── pom.xml                          # Maven 설정파일
├── .gitignore
├── README.md
├── src/
│   ├── main/
│   │   ├── java/com/dailyreport/
│   │   │   ├── DailyReportApplication.java         # 메인 앱 클래스
│   │   │   ├── controller/
│   │   │   │   ├── ReportController.java           # 일지 관리 API
│   │   │   │   └── OllamaController.java           # AI 생성 API
│   │   │   ├── service/
│   │   │   │   ├── ReportService.java              # 일지 비즈니스 로직
│   │   │   │   └── OllamaService.java              # Ollama 통신 로직
│   │   │   ├── repository/
│   │   │   │   └── ReportRepository.java           # DB 쿼리 인터페이스
│   │   │   ├── model/
│   │   │   │   ├── Report.java                     # 업무 일지 엔티티
│   │   │   │   ├── OllamaRequest.java              # AI 요청 모델
│   │   │   │   └── OllamaResponse.java             # AI 응답 모델
│   │   │   ├── config/
│   │   │   │   ├── DatabaseConfig.java             # DB 설정
│   │   │   │   └── AppConfig.java                  # 앱 설정
│   │   │   └── util/
│   │   │       └── DateUtil.java                   # 날짜 유틸
│   │   ├── resources/
│   │   │   ├── application.properties              # 앱 설정
│   │   │   ├── schema.sql                          # DB 스키마
│   │   │   └── static/
│   │   │       ├── index.html                      # 메인 페이지
│   │   │       ├── css/style.css                   # 스타일시트
│   │   │       └── js/app.js                       # 프런트엔드 로직
│   └── test/
│       └── java/com/dailyreport/                   # 단위테스트
└── target/                          # 빌드 출력 디렉토리
```

## 설치 및 실행 가이드

### 사전 요구사항

- **Java 17** 이상 설치
- **Maven 3.8.0** 이상 설치
- **Ollama** 설치 및 모델 다운로드 (선택)

---

## Windows에서 따라하기 (초등학생도 가능한 단계)

### 1단계: Windows에 Java 설치하기

1. 인터넷 브라우저를 열고 다음 주소로 이동합니다.
   - https://adoptium.net/
2. `Temurin 17` 또는 `Java 17`을 선택합니다.
3. Windows용 설치 프로그램(`.msi` 또는 `.zip`)을 다운로드합니다.
4. 다운로드한 파일을 실행하고 설치합니다.
5. 설치가 끝나면 명령 프롬프트를 엽니다.
6. 아래 명령을 입력하고 Enter를 누릅니다.

```bat
java -version
```

- `openjdk version "17...` 또는 비슷한 내용이 나오면 설치가 성공한 것입니다.

### 2단계: Windows에 Maven 설치하기

1. 인터넷 브라우저를 열고 다음 주소로 이동합니다.
   - https://maven.apache.org/download.cgi
2. 최신 버전의 `Binary zip archive` 파일을 다운로드합니다.
3. 압축을 풀고 예: `C:\Program Files\apache-maven-3.x.x` 폴더 안에 둡니다.
4. 시스템 환경 변수에 `MAVEN_HOME`을 추가합니다.
5. `Path` 환경 변수에 `C:\Program Files\apache-maven-3.x.x\bin`을 추가합니다.
6. 명령 프롬프트를 열고 아래 명령을 입력합니다.

```bat
mvn -version
```

- Maven 버전이 보이면 설치가 완료된 것입니다.

### 3단계: 프로젝트 파일 준비하기

1. `DailyReport` 폴더를 Windows PC로 복사합니다.
   - 예: `C:\Users\사용자이름\Documents\DailyReport`
2. 명령 프롬프트를 열고 다음 명령을 입력합니다.

```bat
cd C:\Users\사용자이름\Documents\DailyReport
```

### 4단계: `jar` 파일 만들기

1. 다음 명령을 입력합니다.

```bat
mvn clean package
```

2. 빌드가 성공하면 `target` 폴더 안에 `daily-report-1.0.0.jar` 파일이 생깁니다.

### 5단계: `jar` 파일 실행하기

1. 아래 명령을 입력합니다.

```bat
java -jar target\daily-report-1.0.0.jar
```

2. 실행이 시작되면 웹 브라우저를 열고 다음 주소로 이동합니다.

```text
http://localhost:8080
```

---

## Windows에서 `.exe` 파일 만들기

### 0단계: `jpackage` 확인하기

- Java 17을 설치하면 `jpackage` 도구가 같이 설치될 수 있습니다.
- 명령 프롬프트에서 아래 명령을 실행합니다.

```bat
jpackage --version
```

- 숫자 버전이 나오면 준비가 된 것입니다.

### 1단계: 자동 빌드 스크립트 사용하기

1. `DailyReport` 프로젝트 폴더로 이동합니다.

```bat
cd C:\Users\사용자이름\Documents\DailyReport
```

2. `build-windows.bat` 파일을 더블 클릭하거나 아래 명령을 실행합니다.

```bat
build-windows.bat
```

3. 빌드가 성공하면 `target\daily-report-1.0.0.jar` 파일이 만들어집니다.

### 2단계: 자동 패키지 스크립트 사용하기

1. `package-windows.bat` 파일을 더블 클릭하거나 아래 명령을 실행합니다.

```bat
package-windows.bat
```

2. 패키지가 성공하면 `release` 폴더 안에 `DailyReport.exe`가 생성됩니다.

### 3단계: `exe` 파일 실행하기

1. `release` 폴더를 엽니다.
2. `DailyReport.exe`를 더블 클릭합니다.
3. 프로그램이 실행되면 웹 브라우저에서 다음 주소로 이동합니다.

```text
http://localhost:8080
```

---

## 꼭 기억할 것

- 이 저장소에는 소스 코드가 들어가고, `.exe` 파일은 보통 따로 만들어서 사용합니다.
- `.exe` 파일을 Git에 꼭 커밋할 필요는 없습니다. 대신 만든 `release` 폴더를 다른 사람에게 전달하거나 GitHub Release에 올리는 것이 좋습니다.
- `java -jar` 명령으로도 프로그램을 실행할 수 있기 때문에, `.exe` 없이도 PC에서 바로 사용할 수 있습니다.

## 주요 API 엔드포인트

### 업무 일지 관리

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| `GET` | `/api/reports` | 모든 일지 조회 |
| `GET` | `/api/reports/{id}` | 특정 일지 조회 |
| `GET` | `/api/reports/date/{reportDate}` | 날짜별 일지 조회 |
| `GET` | `/api/reports/search?keyword=...` | 키워드 검색 |
| `POST` | `/api/reports` | 새 일지 작성 |
| `PUT` | `/api/reports/{id}` | 일지 수정 |
| `DELETE` | `/api/reports/{id}` | 일지 삭제 |

### AI 통합 (Ollama)

| 메서드 | 엔드포인트 | 설명 |
|--------|-----------|------|
| `GET` | `/api/ollama/status` | Ollama 연결 상태 확인 |
| `POST` | `/api/ollama/generate` | AI 요약 생성 |
| `POST` | `/api/ollama/config` | Ollama 설정 변경 |

## 데이터베이스 스키마

### daily_reports 테이블

```sql
CREATE TABLE daily_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    report_date VARCHAR(10) NOT NULL,
    ai_summary TEXT,
    ai_processed BOOLEAN DEFAULT 0
);
```

## 로컬 Ollama 설정

### Ollama 설치 및 실행

1. **Ollama 다운로드**: https://ollama.ai
2. **모델 다운로드**:
   ```bash
   ollama pull llama2
   # 또는
   ollama pull gemma:2b
   ```
3. **Ollama 서버 실행**:
   ```bash
   ollama serve
   ```
   기본 API 주소: `http://localhost:11434`

### 애플리케이션 설정 (application.properties)

```properties
# Ollama 연결 설정
ollama.api.url=http://localhost:11434
ollama.api.model=llama2
```

## 향후 계획 (2단계 이상)

- ✅ 1단계: 기본 환경 및 로컬 환경 구축
- 🔄 2단계: AI 요약 기능 고도화
- 🔄 3단계: 사용자 인증 및 권한 관리
- 🔄 4단계: 고급 분석 및 리포팅 기능
- 🔄 5단계: 독립형 .exe 패키징 (GraalVM, Launch4j 사용)
- 🔄 6단계: 사내 배포 및 최적화

## 문제 해결

### 포트 8080이 이미 사용 중인 경우

```bash
# 다른 포트로 실행
java -jar target/daily-report-1.0.0.jar --server.port=8081
```

### Ollama 연결 실패

1. Ollama가 실행 중인지 확인: `http://localhost:11434/api/tags`
2. 방화벽 설정 확인
3. application.properties에서 `ollama.api.url` 확인

### 데이터베이스 파일 위치

기본 저장 경로: `./user-data/daily_reports.db`

사용자 정의 경로를 설정하려면 `application.properties` 수정:
```properties
app.data-path=/your/custom/path
```

## 보안 주의사항

⚠️ **폐쇄망 환경 사용 필수**:
- 인터넷 연결이 차단된 사내망에서만 사용
- Ollama API는 `localhost:11434`에서만 응답하도록 설정
- 데이터는 SQLite 로컬 파일로만 저장
- 민감한 데이터는 적절히 암호화 처리 권장

## 라이선스

Internal Use Only - 사내 전용 프로그램

## 개발자 정보

**프롬프트 엔지니어링 기반 개발**: GitHub Copilot with Claude Haiku 4.5  
**개발 환경**: VS Code Codespace (Ubuntu 24.04.4 LTS)

---

**Last Updated**: 2024-06-17  
**Version**: 1.0.0 - Alpha