# DevOps Setup Documentation

## Overview

This document describes the complete DevOps setup for the KIT Website, including automated deployments via GitHub webhooks.

## Architecture

```
GitHub (K-I-T-Solutions/kit-website)
  ↓ (push to main)
Webhook → https://kit-it-koblenz.de/webhook
  ↓
Caddy (reverse proxy)
  ↓
Webhook Server (Node.js, port 9000)
  ↓
deploy.sh
  ↓
Docker Compose (rebuild & restart)
  ├── Caddy Container (ports 80, 443)
  └── Next.js Container (port 3000)
```

## Components

### 1. GitHub Repository
- **Organization:** K-I-T-Solutions
- **Repository:** kit-website
- **URL:** https://github.com/K-I-T-Solutions/kit-website

### 2. Webhook Server
- **Location:** `/srv/kit-website/webhook-server.js`
- **Port:** 9000
- **Service:** `webhook.service`
- **Secret:** Stored in systemd environment variables

### 3. Deployment Script
- **Location:** `/srv/kit-website/deploy.sh`
- **Function:** Pull latest code, rebuild containers

### 4. Web Server
- **Reverse Proxy:** Caddy
- **Domain:** kit-it-koblenz.de
- **SSL:** Automatic via Cloudflare DNS

## Deployment Flow

1. Developer pushes code to `main` branch
2. GitHub sends webhook POST to `https://kit-it-koblenz.de/webhook`
3. Caddy routes request to webhook server on port 9000
4. Webhook server verifies GitHub signature
5. If valid, webhook server executes `/srv/kit-website/deploy.sh`
6. Deploy script:
   - Pulls latest code from GitHub
   - Stops containers
   - Rebuilds with latest code
   - Starts containers

## Secrets & Configuration

### Environment Variables (.env)
```bash
CLOUDFLARE_API_TOKEN=***
FORMSPREE_FORM_ID=***
DISCORD_WEBHOOK_URL=***
```

### Webhook Secret
Stored in: `/etc/systemd/system/webhook.service`
Generated with: `openssl rand -hex 32`

## Manual Operations

### Check Service Status
```bash
# Webhook server
sudo systemctl status webhook.service

# Docker containers
docker compose ps

# View logs
sudo journalctl -u webhook.service -f
docker compose logs -f
```

### Manual Deployment
```bash
ssh web-01
cd /srv/kit-website
./deploy.sh
```

### Restart Webhook Server
```bash
sudo systemctl restart webhook.service
```

### Update Webhook Secret
1. Generate new secret: `openssl rand -hex 32`
2. Update `/etc/systemd/system/webhook.service`
3. Reload systemd: `sudo systemctl daemon-reload`
4. Restart service: `sudo systemctl restart webhook.service`
5. Update GitHub webhook settings

## Monitoring

### Webhook Deliveries
Check recent webhook deliveries in GitHub:
https://github.com/K-I-T-Solutions/kit-website/settings/hooks

### Server Logs
```bash
# Last 50 webhook events
sudo journalctl -u webhook.service -n 50

# Follow webhook logs
sudo journalctl -u webhook.service -f

# Docker logs
docker compose logs --tail=100 -f
```

### Health Checks
```bash
# Test webhook endpoint (should return error - no signature)
curl -X POST https://kit-it-koblenz.de/webhook

# Check if containers are running
docker compose ps

# Check website
curl -I https://kit-it-koblenz.de
```

## Troubleshooting

### Webhook not triggering deployments

1. Check webhook server is running:
   ```bash
   sudo systemctl status webhook.service
   ```

2. Check webhook logs:
   ```bash
   sudo journalctl -u webhook.service -n 50
   ```

3. Verify GitHub webhook is configured:
   - URL: https://kit-it-koblenz.de/webhook
   - Content type: application/json
   - Secret matches server configuration
   - SSL verification enabled

4. Test webhook manually:
   - Go to GitHub webhook settings
   - Click "Recent Deliveries"
   - Click a delivery to see request/response

### Deployment fails

1. Check deploy script permissions:
   ```bash
   ls -la /srv/kit-website/deploy.sh
   chmod +x /srv/kit-website/deploy.sh
   ```

2. Run deployment manually to see errors:
   ```bash
   cd /srv/kit-website
   bash -x ./deploy.sh
   ```

3. Check Docker status:
   ```bash
   docker compose ps
   docker compose logs
   ```

### Containers won't start

1. Check for build errors:
   ```bash
   docker compose down
   docker compose build
   docker compose up -d
   ```

2. Check logs:
   ```bash
   docker compose logs caddy
   docker compose logs kit-website
   ```

3. Verify environment variables:
   ```bash
   cat /srv/kit-website/.env
   ```

## Security Considerations

- Webhook secret uses cryptographic random generation
- GitHub signature verification prevents unauthorized deployments
- SSL/TLS enforced for all webhook requests
- Minimal permissions for webhook service user
- Secrets stored in systemd environment (not in code)
- .env file excluded from git (in .gitignore)

## Backup & Recovery

### Backup
Important files to backup:
- `/srv/kit-website/.env` (secrets)
- `/etc/systemd/system/webhook.service` (webhook secret)
- Docker volumes: `caddy_data`, `caddy_config`

### Recovery
```bash
# Restore from GitHub
cd /srv
git clone https://github.com/K-I-T-Solutions/kit-website.git
cd kit-website

# Restore .env file from backup
cp /path/to/backup/.env .

# Rebuild and start
docker compose up -d --build

# Setup webhook service
sudo cp webhook.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable webhook.service
sudo systemctl start webhook.service
```

## Future Improvements

- [ ] Add staging environment
- [ ] Implement blue-green deployments
- [ ] Add health check endpoint
- [ ] Implement rollback mechanism
- [ ] Add deployment notifications (Discord/Slack)
- [ ] Add automated testing before deployment
- [ ] Implement deployment locks
- [ ] Add metrics and monitoring (Prometheus/Grafana)
