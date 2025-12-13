# 🚀 LMS Deployment Checklist

## Pre-Deployment

- [ ] Code is tested locally
- [ ] All dependencies are listed in package.json
- [ ] Build completes without errors (`npm run build`)
- [ ] Environment variables are configured
- [ ] SSH key permissions are correct (chmod 600)
- [ ] DNS is configured: lms.valtara.ai → 188.245.43.183

## Deployment Steps

### 1. Quick Deploy (Recommended)
```powershell
cd d:\LMS
.\deploy.ps1
```

### 2. Verify Deployment
- [ ] Visit http://lms.valtara.ai
- [ ] Visit http://188.245.43.183
- [ ] Check PM2 status: `ssh -i ubuntu-ky.pem ubuntu@188.245.43.183 "pm2 status"`
- [ ] Check logs: `ssh -i ubuntu-ky.pem ubuntu@188.245.43.183 "pm2 logs valt-lms --lines 50"`

## Post-Deployment

### Security
- [ ] Setup SSL certificate (use Certbot)
- [ ] Configure firewall (UFW)
- [ ] Update server packages: `sudo apt update && sudo apt upgrade`
- [ ] Change default SSH port (optional)
- [ ] Setup fail2ban (optional)

### Monitoring
- [ ] PM2 monitoring: `pm2 monit`
- [ ] Setup PM2 web monitoring (optional)
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Setup uptime monitoring

### Optimization
- [ ] Enable Nginx gzip compression
- [ ] Configure caching headers
- [ ] Setup CDN (optional)
- [ ] Enable HTTP/2 in Nginx

## Quick Commands

**Connect to server:**
```bash
.\ssh-connect.bat
```

**View logs:**
```bash
ssh -i "%USERPROFILE%\Downloads\Francis\ubuntu-ky.pem" ubuntu@188.245.43.183 "pm2 logs valt-lms"
```

**Restart application:**
```bash
ssh -i "%USERPROFILE%\Downloads\Francis\ubuntu-ky.pem" ubuntu@188.245.43.183 "pm2 restart valt-lms"
```

**Check server resources:**
```bash
ssh -i "%USERPROFILE%\Downloads\Francis\ubuntu-ky.pem" ubuntu@188.245.43.183 "htop"
```

## Troubleshooting

### Application not accessible
1. Check if PM2 is running: `pm2 status`
2. Check Nginx: `sudo systemctl status nginx`
3. Check firewall: `sudo ufw status`
4. Check port 3000: `sudo lsof -i :3000`

### SSL Issues
```bash
sudo certbot --nginx -d lms.valtara.ai --force-renew
```

### High memory usage
```bash
pm2 restart valt-lms
```

### Need to rollback
```bash
cd /var/www/valt-lms
git log  # Find previous commit
git checkout <commit-hash>
npm install
npm run build
pm2 restart valt-lms
```

## Support

For issues, check:
1. PM2 logs: `pm2 logs valt-lms`
2. Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
3. System logs: `sudo journalctl -xe`
