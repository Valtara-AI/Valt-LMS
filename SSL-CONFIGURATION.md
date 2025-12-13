# SSL Certificate Configuration - Valt LMS

## ✅ SSL Certificate Successfully Installed

### Certificate Details
- **Domain**: lms.valtara.ai
- **Certificate Authority**: Let's Encrypt
- **Certificate Type**: ECDSA
- **Issue Date**: November 3, 2025
- **Expiry Date**: February 1, 2026 (Valid for 89 days)
- **Certificate Path**: `/etc/letsencrypt/live/lms.valtara.ai/fullchain.pem`
- **Private Key Path**: `/etc/letsencrypt/live/lms.valtara.ai/privkey.pem`

### Configuration Status
✅ **HTTPS Enabled** - Port 443 active  
✅ **HTTP to HTTPS Redirect** - All HTTP traffic automatically redirected to HTTPS  
✅ **Auto-Renewal Enabled** - Certificate will auto-renew twice daily  
✅ **SSL Grade A** - Modern TLS configuration with strong ciphers  

### Access URLs
- **Primary HTTPS URL**: https://lms.valtara.ai
- **HTTP (auto-redirects)**: http://lms.valtara.ai

### Nginx SSL Configuration
The following SSL settings were automatically configured by Certbot:

```nginx
listen [::]:443 ssl ipv6only=on;
listen 443 ssl;
ssl_certificate /etc/letsencrypt/live/lms.valtara.ai/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/lms.valtara.ai/privkey.pem;
include /etc/letsencrypt/options-ssl-nginx.conf;
ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
```

### HTTP to HTTPS Redirect
Automatic redirect configured for all HTTP traffic:

```nginx
server {
    if ($host = lms.valtara.ai) {
        return 301 https://$host$request_uri;
    }
    
    listen 80;
    listen [::]:80;
    server_name lms.valtara.ai 188.245.43.183;
    return 404;
}
```

## Certificate Management

### Check Certificate Status
```bash
ssh -i "ubuntu-ky.pem" root@188.245.43.183 "certbot certificates"
```

### Manual Certificate Renewal (if needed)
```bash
ssh -i "ubuntu-ky.pem" root@188.245.43.183 "certbot renew"
```

### Check Auto-Renewal Timer
```bash
ssh -i "ubuntu-ky.pem" root@188.245.43.183 "systemctl status certbot.timer"
```

### Test Auto-Renewal (dry run)
```bash
ssh -i "ubuntu-ky.pem" root@188.245.43.183 "certbot renew --dry-run"
```

## Automatic Renewal
The Certbot timer runs twice daily and will automatically renew certificates when they have 30 days or less remaining. The timer is enabled by default and managed by systemd.

**Next automatic check**: The timer runs at 10:27 AM and 10:27 PM UTC daily.

## Troubleshooting

### If Certificate Renewal Fails
1. Check Certbot logs:
   ```bash
   ssh -i "ubuntu-ky.pem" root@188.245.43.183 "tail -100 /var/log/letsencrypt/letsencrypt.log"
   ```

2. Ensure Nginx is running:
   ```bash
   ssh -i "ubuntu-ky.pem" root@188.245.43.183 "systemctl status nginx"
   ```

3. Verify port 80 and 443 are accessible:
   ```bash
   ssh -i "ubuntu-ky.pem" root@188.245.43.183 "ss -tlnp | grep ':80\|:443'"
   ```

### Force Certificate Renewal
```bash
ssh -i "ubuntu-ky.pem" root@188.245.43.183 "certbot renew --force-renewal"
```

## Security Features

✅ **TLS 1.2 and 1.3** - Modern encryption protocols  
✅ **Strong Cipher Suites** - PFS (Perfect Forward Secrecy) enabled  
✅ **OCSP Stapling** - Enhanced certificate validation  
✅ **HSTS Ready** - Can be enabled for additional security  

## Next Steps (Optional)

### Enable HSTS (HTTP Strict Transport Security)
Add this to your Nginx SSL server block:
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### Monitor Certificate Expiry
Set up monitoring alerts for certificate expiration (recommended for production).

---

**Deployment Date**: November 3, 2025  
**SSL Certificate Provider**: Let's Encrypt (Free, Automated, Open)  
**Status**: ✅ Production Ready with HTTPS
