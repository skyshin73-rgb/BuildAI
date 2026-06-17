@echo off
REM DailyReport Windows packaging script
REM 사용법: 이 파일을 두 번 클릭하거나 명령 프롬프트에서 실행하세요.
REM jpackage가 설치되어 있어야 합니다.

set APP_NAME=DailyReport
set MAIN_JAR=target\daily-report-1.0.0.jar
set MAIN_CLASS=com.dailyreport.DailyReportApplication
set RELEASE_DIR=release

echo =============================
echo DailyReport.exe 패키지를 생성합니다...
if not exist %MAIN_JAR% (
    echo %MAIN_JAR% 파일을 찾을 수 없습니다.
    echo 먼저 build-windows.bat를 실행하여 JAR 파일을 만드세요.
    pause
    exit /b 1
)

jpackage --type exe --name %APP_NAME% --input target --main-jar daily-report-1.0.0.jar --main-class %MAIN_CLASS% --dest %RELEASE_DIR% --win-console
if errorlevel 1 (
    echo.
    echo exe 패키지 생성에 실패했습니다.
    pause
    exit /b 1
)

echo.
echo 패키지 생성이 완료되었습니다.
echo %RELEASE_DIR% 폴더에서 %APP_NAME%.exe를 실행하세요.
echo =============================
pause
