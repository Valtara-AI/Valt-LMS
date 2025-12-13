@echo off
REM LMS Deployment Script for Windows
REM Server: lms.valtara.ai (188.245.43.183)

echo 🚀 Starting LMS Deployment...

SET SERVER_USER=ubuntu
SET SERVER_IP=188.245.43.183
SET SERVER_DOMAIN=lms.valtara.ai
SET SSH_KEY=%USERPROFILE%\Downloads\Francis\ubuntu-ky.pem
SET APP_NAME=valt-lms
SET REMOTE_DIR=/var/www/valt-lms

echo 📦 Building application...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed!
    exit /b 1
)

echo 📤 Uploading application files...
echo This requires rsync. Using SCP fallback...

REM Create a temporary batch file for remote commands
echo cd /var/www/valt-lms > temp_remote_commands.sh
echo npm install --production >> temp_remote_commands.sh
echo npm run build >> temp_remote_commands.sh
echo pm2 delete valt-lms 2^>^/dev/null ^|^| true >> temp_remote_commands.sh
echo pm2 start npm --name "valt-lms" -- start >> temp_remote_commands.sh
echo pm2 save >> temp_remote_commands.sh

echo 🔐 Connecting to server...
echo.
echo Next steps to complete manually:
echo 1. Copy the SSH key to a convenient location
echo 2. Use WinSCP or FileZilla to upload the build files
echo 3. Or use the PowerShell script deploy.ps1
echo.

echo ✅ Build complete! Manual deployment steps above.
pause
