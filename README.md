# KIT Website

Website für K.I.T. Solutions - IT-Support & Creator-IT in Koblenz

## Tech Stack

- **Framework:** Next.js 15.2.6
- **UI:** React 19, Tailwind CSS, shadcn/ui
- **Deployment:** Docker + Caddy
- **Platform:** Ubuntu 24.04 LTS

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Environment Variables

Create a `.env` file with:

```env
CLOUDFLARE_API_TOKEN=your-token
FORMSPREE_FORM_ID=your-form-id
DISCORD_WEBHOOK_URL=your-webhook-url
```

## Production Deployment

### Prerequisites

- Docker & Docker Compose installed on server
- Node.js 20+ for webhook server
- Git configured with SSH access to GitHub

### Initial Setup

1. **Clone repository on server:**
   ```bash
   cd /srv
   git clone https://github.com/K-I-T-Solutions/kit-website.git
   cd kit-website
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Build and start containers:**
   ```bash
   docker compose up -d --build
   ```

### Automated Deployment Setup

1. **Copy webhook server files:**
   ```bash
   sudo cp webhook-server.js /srv/kit-website/
   sudo chmod +x /srv/kit-website/deploy.sh
   ```

2. **Generate webhook secret:**
   ```bash
   openssl rand -hex 32
   ```

3. **Setup systemd service:**
   ```bash
   # Edit webhook.service and add your secret
   sudo cp webhook.service /etc/systemd/system/webhook.service
   sudo systemctl daemon-reload
   sudo systemctl enable webhook.service
   sudo systemctl start webhook.service
   ```

4. **Configure Caddy reverse proxy:**
   Add to your Caddyfile:
   ```
   kit-it-koblenz.de {
       handle /webhook {
           reverse_proxy localhost:9000
       }

       handle {
           reverse_proxy kit-website:3000
       }
   }
   ```

5. **Setup GitHub Webhook:**
   - Go to: https://github.com/K-I-T-Solutions/kit-website/settings/hooks
   - Add webhook:
     - URL: `https://kit-it-koblenz.de/webhook`
     - Content type: `application/json`
     - Secret: [your generated secret]
     - Events: Just the push event
     - Active: ✓

### Manual Deployment

```bash
ssh web-01
cd /srv/kit-website
./deploy.sh
```

## Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── actions/           # Server actions
│   ├── (routes)/          # Page routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── public/               # Static assets
├── lib/                  # Utility functions
├── Dockerfile            # Next.js container
├── Dockerfile.caddy      # Caddy container
├── docker-compose.yml    # Docker orchestration
├── Caddyfile            # Caddy configuration
└── deploy.sh            # Deployment script
```

## Monitoring

```bash
# Check container status
docker compose ps

# View logs
docker compose logs -f

# View webhook server logs
sudo journalctl -u webhook.service -f
```

## Troubleshooting

### Containers not starting

```bash
docker compose down
docker compose up -d --build
```

### Webhook not triggering

```bash
# Check webhook server status
sudo systemctl status webhook.service

# Check webhook logs
sudo journalctl -u webhook.service -n 50

# Test webhook locally
curl -X POST http://localhost:9000/webhook
```

### Git pull fails

```bash
# Reset to remote state
git fetch origin
git reset --hard origin/main
```

## License

Proprietary - K.I.T. Solutions © 2026
# Automated Deployment Test
