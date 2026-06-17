@echo off
REM DailyReport Windows build script
REM 사용법: 이 파일을 두 번 클릭하거나 명령 프롬프트에서 실행하세요.
echo =============================
echo DailyReport 빌드를 시작합니다...
mvn clean package
if errorlevel 1 (
    echo.
    echo Maven 빌드에 실패했습니다.
    pause
    exit /b 1
)
echo.
echo 빌드가 완료되었습니다.
echo target\daily-report-1.0.0.jar 파일을 확인하세요.
echo =============================
pause
