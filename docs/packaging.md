# BuildAI 패키징 안내

이 문서는 BuildAI를 Windows 실행 파일로 묶는 최종 패키징 기준을 기록한다.

## 포함 대상

* `assets/models/`
* `assets/ai/`
* `src-tauri/`의 SQLite 연동과 로컬 AI 호출 로직
* `dist/`의 React 프론트엔드 번들

## 필요한 파일

* `assets/models/qwen3.gguf` 또는 동급 GGUF 모델
* `assets/ai/llama-cli.exe`

## 빌드 순서

```bash
npm install
npm run package:check
npm run tauri:build
```

## 결과물

* Windows용 NSIS 설치 파일 `.exe`
* Tauri 번들 리소스 내부에 모델과 llama.cpp 실행 파일 포함

## 확인 규칙

* 인터넷 연결 없이 실행되어야 한다.
* 추가 설치 프로그램 없이 실행되어야 한다.
* 실행 후에도 SQLite 데이터는 사용자가 선택한 로컬 폴더에 유지되어야 한다.
