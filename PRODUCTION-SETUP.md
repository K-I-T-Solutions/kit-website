# Production Setup Guide

Complete guide to set up the production-ready KIT Website infrastructure with zero-downtime deployments, monitoring, and automated backups.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Zero-Downtime Deployments](#zero-downtime-deployments)
3. [Monitoring Setup](#monitoring-setup)
4. [Automated Backups](#automated-backups)
5. [Staging Environment](#staging-environment)

---

## Quick Start

### Current Simple Setup (Single Instance)

```bash
cd /srv/kit-website
docker compose up -d --build
```

### Upgrade to Production Setup (Blue-Green)

```bash
# 1. Switch to Blue-Green deployment
cd /srv/kit-website

# 2. Backup current Caddyfile
cp Caddyfile Caddyfile.simple

# 3. Use Blue-Green Caddyfile
cp Caddyfile.bluegreen Caddyfile

# 4. Deploy using Blue-Green
docker compose -f docker-compose.prod.yml up -d --build

# 5. Update webhook to use new deploy script
sudo sed -i 's|deploy.sh|deploy-bluegreen.sh|' /etc/systemd/system/webhook.service
sudo systemctl daemon-reload
sudo systemctl restart webhook.service
```

---

## Zero-Downtime Deployments

### How It Works

```
┌─────────────┐
│   GitHub    │
│    Push     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Webhook   │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│  deploy-bluegreen│
│                  │
│  1. Build GREEN  │
│  2. Health Check │
│  3. Switch Traffic│
│  4. Keep BLUE    │
└──────────────────┘
```

### Architecture

- **Blue Instance**: Primary production instance
- **Green Instance**: Secondary instance for deployments
- **Caddy**: Load balancer with health checks
- **Health Checks**: Automatic failover if instance fails

### Files

- `docker-compose.prod.yml` - Blue-Green container configuration
- `Caddyfile.bluegreen` - Load balancer with health checks
- `deploy-bluegreen.sh` - Zero-downtime deployment script

### Manual Deployment

```bash
cd /srv/kit-website
./deploy-bluegreen.sh
```

### Rollback

If deployment fails, the script automatically keeps the old instance running.

Manual rollback:
```bash
# Stop the new instance
docker compose -f docker-compose.prod.yml stop kit-website-green

# Old instance (blue) continues serving traffic
docker compose -f docker-compose.prod.yml ps
```

---

## Monitoring Setup

### Components

1. **Uptime Kuma** - Uptime monitoring & status page
2. **Prometheus** - Metrics collection
3. **Node Exporter** - Server metrics
4. **cAdvisor** - Container metrics

### Installation

```bash
cd /srv/kit-website

# Start monitoring stack
docker compose -f docker-compose.monitoring.yml up -d

# Access monitoring dashboards
# Uptime Kuma: http://YOUR-SERVER-IP:3001
# Prometheus: http://YOUR-SERVER-IP:9090
# cAdvisor: http://YOUR-SERVER-IP:8080
```

### Configure Uptime Kuma

1. Open `http://YOUR-SERVER-IP:3001`
2. Create admin account
3. Add monitors:

#### Website Monitor
- **Type**: HTTP(s)
- **URL**: https://kit-it-koblenz.de
- **Interval**: 60 seconds
- **Retry**: 3 times

#### Health Endpoint
- **Type**: HTTP(s)
- **URL**: https://kit-it-koblenz.de/health
- **Interval**: 30 seconds

#### Docker Containers
- **Type**: Docker Container
- **Container Name**: kit-website-blue
- **Interval**: 60 seconds

### Notifications

Configure notifications in Uptime Kuma:
- Discord webhook
- Email (SMTP)
- Telegram
- Slack

### Expose Monitoring via Caddy

Add to your Caddyfile:

```caddyfile
monitoring.kit-it-koblenz.de {
    reverse_proxy uptime-kuma:3001
}
```

---

## Automated Backups

### What Gets Backed Up

- ✅ Git repository
- ✅ Environment variables (.env)
- ✅ Docker volumes (Caddy data & config)
- ✅ Configuration files
- ✅ Metadata (commit hash, date, etc.)

### Setup

```bash
cd /srv/kit-website

# Make backup script executable
chmod +x backup.sh restore.sh

# Test backup manually
./backup.sh

# Install systemd timer for daily backups
sudo cp backup.service /etc/systemd/system/
sudo cp backup.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable backup.timer
sudo systemctl start backup.timer

# Check backup timer status
sudo systemctl status backup.timer
sudo systemctl list-timers | grep backup
```

### Backup Schedule

- **Frequency**: Daily at 3:00 AM
- **Retention**: 30 days
- **Location**: `/srv/backups/kit-website/`

### Manual Backup

```bash
cd /srv/kit-website
./backup.sh
```

### Restore from Backup

```bash
# List available backups
ls -lh /srv/backups/kit-website/

# Restore specific backup
./restore.sh /srv/backups/kit-website/kit-website_20260118_030000.tar.gz
```

### Off-Site Backups (Recommended)

Add to `backup.sh` after line with compression:

```bash
# Upload to remote server via rsync
rsync -avz "${BACKUP_NAME}.tar.gz" user@backup-server:/backups/kit-website/

# Or upload to S3
# aws s3 cp "${BACKUP_NAME}.tar.gz" s3://your-bucket/backups/kit-website/
```

---

## Staging Environment

### Setup Staging Server

```bash
# On staging server
cd /srv
git clone https://github.com/K-I-T-Solutions/kit-website.git kit-website-staging
cd kit-website-staging

# Create staging environment file
cp .env.example .env.staging
nano .env.staging  # Edit with staging values

# Use staging docker compose
cp docker-compose.yml docker-compose.staging.yml
nano docker-compose.staging.yml  # Change ports if needed

# Start staging environment
docker compose -f docker-compose.staging.yml up -d
```

### Staging Workflow

```
Developer → Push to staging branch → Auto-deploy to staging → Test → Merge to main → Deploy to production
```

### Configure Staging Webhook

1. Create staging branch:
```bash
git checkout -b staging
git push origin staging
```

2. Add webhook for staging branch in GitHub

3. Update webhook server to handle staging branch:

```javascript
// In webhook-server.js
if (payload.ref === 'refs/heads/staging') {
  exec('bash /srv/kit-website-staging/deploy.sh');
}
```

---

## Security Checklist

- [x] SSL/TLS enabled (Caddy automatic HTTPS)
- [x] Security headers configured
- [x] Webhook signature verification
- [x] Environment variables not in git
- [x] Regular backups
- [ ] Firewall configured (ufw)
- [ ] SSH key-only authentication
- [ ] Fail2ban installed
- [ ] Regular security updates

### Recommended: Setup Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Block monitoring ports from external access
# (access via SSH tunnel instead)
sudo ufw deny 3001/tcp  # Uptime Kuma
sudo ufw deny 9090/tcp  # Prometheus
sudo ufw deny 8080/tcp  # cAdvisor

sudo ufw enable
```

---

## Troubleshooting

### Blue-Green Deployment Fails

```bash
# Check which instances are running
docker ps | grep kit-website

# Check health of instances
docker exec kit-website-blue wget -O- http://localhost:3000
docker exec kit-website-green wget -O- http://localhost:3000

# View deployment logs
sudo journalctl -u webhook.service -n 100
```

### Monitoring Not Working

```bash
# Check monitoring containers
docker compose -f docker-compose.monitoring.yml ps

# View logs
docker compose -f docker-compose.monitoring.yml logs uptime-kuma
```

### Backup Failed

```bash
# Check disk space
df -h

# Manually run backup with verbose output
bash -x ./backup.sh

# Check backup timer
sudo journalctl -u backup.service -n 50
```

---

## Performance Optimization

### Enable HTTP/3

Already enabled in Caddy configuration.

### Image Optimization

```bash
# Install in Dockerfile
RUN pnpm add sharp
```

### Caching

Caddy automatically caches static assets. CDN configuration:

```caddyfile
kit-it-koblenz.de {
    header {
        # Cache static assets for 1 year
        @static path *.js *.css *.png *.jpg *.svg *.woff *.woff2
        Cache-Control "public, max-age=31536000, immutable" @static
    }
}
```

---

## Monitoring Metrics

Key metrics to monitor:

1. **Uptime**: Should be >99.9%
2. **Response Time**: Should be <500ms (p95)
3. **Error Rate**: Should be <0.1%
4. **CPU Usage**: Should be <70%
5. **Memory Usage**: Should be <80%
6. **Disk Usage**: Should be <80%

---

## Cost Optimization

- Use Docker multi-stage builds (already configured)
- Prune unused images weekly: `docker system prune -a`
- Monitor resource usage and right-size server
- Consider CDN for static assets

---

## Next Steps

1. ✅ Zero-downtime deployments configured
2. ✅ Monitoring stack ready
3. ✅ Automated backups scheduled
4. ⏳ Configure staging environment
5. ⏳ Setup off-site backups
6. ⏳ Configure alerting (Discord/Email)
7. ⏳ Add performance monitoring
8. ⏳ Setup CDN (Cloudflare)
