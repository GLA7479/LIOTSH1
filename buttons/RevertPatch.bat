@echo off
setlocal ENABLEDELAYEDEXPANSION

set SCRIPT_DIR=%~dp0
set ROOT=%SCRIPT_DIR%..
set PATCH=%ROOT%\patches\example.patch

pushd "%ROOT%"

git --version >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Git לא מותקן. התקן Git for Windows והרץ שוב.
  pause
  popd
  exit /b 1
)

set CREATED_TEMP_REPO=0
if not exist ".git" (
  echo [i] אין ‎.git — יוצרים repo זמני...
  git init >nul 2>&1
  set CREATED_TEMP_REPO=1
)

echo [i] מבטל patch: "%PATCH%"
git apply -R --reject --whitespace=nowarn "%PATCH%"
if errorlevel 1 (
  echo [ERROR] ביטול ה-patch נכשל.
  if "%CREATED_TEMP_REPO%"=="1" rmdir /s /q ".git"
  pause
  popd
  exit /b 1
)

echo [OK] ה-patch בוטל בהצלחה.

if "%CREATED_TEMP_REPO%"=="1" (
  rmdir /s /q ".git"
  echo [i] ניקוי repo זמני.
)

popd
pause
exit /b 0
