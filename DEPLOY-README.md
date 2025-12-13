# 🚀 Quick Start - Deploy LMS

## Fastest Deployment (One Command)

Open PowerShell in the `d:\LMS` directory and run:

```powershell
.\deploy-quick.ps1
```

That's it! The script will:
- ✅ Build your application
- ✅ Upload all files to the server
- ✅ Install dependencies
- ✅ Start the application with PM2
- ✅ Configure everything automatically

## Access Your Application

After deployment completes:
- **Primary URL**: http://lms.valtara.ai
- **IP Access**: http://188.245.43.183

## Server Details

- **Server**: lms.valtara.ai
- **IP**: 188.245.43.183
- **User**: ubuntu
- **SSH Key**: `C:\Users\SHIVAM\Downloads\Francis\ubuntu-ky.pem`

## Quick Commands

### Connect to Server
```powershell
.\ssh-connect.bat
```

### View Application Logs
```powershell
ssh -i "%USERPROFILE%\Downloads\Francis\ubuntu-ky.pem" ubuntu@188.245.43.183 "pm2 logs valt-lms"
```

### Restart Application
```powershell
ssh -i "%USERPROFILE%\Downloads\Francis\ubuntu-ky.pem" ubuntu@188.245.43.183 "pm2 restart valt-lms"
```

### Check Status
```powershell
ssh -i "%USERPROFILE%\Downloads\Francis\ubuntu-ky.pem" ubuntu@188.245.43.183 "pm2 status"
```

## Update Deployment

To deploy updates:

```powershell
.\deploy-quick.ps1
```

## Setup SSL (Recommended)

1. Connect to server: `.\ssh-connect.bat`
2. Run: `sudo certbot --nginx -d lms.valtara.ai`
3. Follow the prompts
4. Access via: https://lms.valtara.ai

## Troubleshooting

### Build fails locally
```powershell
npm install
npm run build
```

### Cannot connect to server
1. Check if SSH key is at correct location
2. Verify server is running
3. Check firewall settings

### Application not accessible
1. Check PM2 status: `pm2 status`
2. Check logs: `pm2 logs valt-lms`
3. Restart: `pm2 restart valt-lms`

## Full Documentation

See `DEPLOYMENT.md` for detailed deployment instructions and `DEPLOYMENT-CHECKLIST.md` for a complete checklist.

## Support

For deployment issues:
1. Check PM2 logs
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify DNS: `nslookup lms.valtara.ai`
