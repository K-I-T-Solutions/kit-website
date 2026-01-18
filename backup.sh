#!/bin/bash
# Automated Backup Script for KIT Website
# Backs up: source code, database, docker volumes, and configuration

set -e

BACKUP_DIR="/srv/backups/kit-website"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="kit-website_${DATE}"
RETENTION_DAYS=30

echo "🔒 Starting backup: $BACKUP_NAME"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create temporary backup directory
TEMP_BACKUP="$BACKUP_DIR/temp_$BACKUP_NAME"
mkdir -p "$TEMP_BACKUP"

# 1. Backup source code (Git repository)
echo "📦 Backing up source code..."
cd /srv/kit-website
git bundle create "$TEMP_BACKUP/git-repo.bundle" --all

# 2. Backup environment variables
echo "🔐 Backing up environment variables..."
if [ -f .env ]; then
    cp .env "$TEMP_BACKUP/env.backup"
fi

# 3. Backup Docker volumes
echo "💾 Backing up Docker volumes..."
docker run --rm \
    -v kit-website_caddy_data:/data \
    -v "$TEMP_BACKUP":/backup \
    alpine tar czf /backup/caddy_data.tar.gz -C /data .

docker run --rm \
    -v kit-website_caddy_config:/data \
    -v "$TEMP_BACKUP":/backup \
    alpine tar czf /backup/caddy_config.tar.gz -C /data .

# 4. Backup configuration files
echo "⚙️  Backing up configuration files..."
cp Caddyfile "$TEMP_BACKUP/Caddyfile.backup"
cp docker-compose.yml "$TEMP_BACKUP/docker-compose.yml.backup"
[ -f docker-compose.prod.yml ] && cp docker-compose.prod.yml "$TEMP_BACKUP/docker-compose.prod.yml.backup"

# 5. Create metadata file
echo "📝 Creating backup metadata..."
cat > "$TEMP_BACKUP/metadata.txt" << EOF
Backup Date: $(date)
Git Commit: $(git rev-parse HEAD)
Git Branch: $(git rev-parse --abbrev-ref HEAD)
Docker Images: $(docker images --format "{{.Repository}}:{{.Tag}}" | grep kit-website)
Hostname: $(hostname)
EOF

# 6. Compress everything
echo "🗜️  Compressing backup..."
cd "$BACKUP_DIR"
tar czf "${BACKUP_NAME}.tar.gz" -C temp_$BACKUP_NAME .

# 7. Cleanup temp directory
rm -rf "$TEMP_BACKUP"

# 8. Calculate checksum
echo "🔍 Calculating checksum..."
sha256sum "${BACKUP_NAME}.tar.gz" > "${BACKUP_NAME}.tar.gz.sha256"

# 9. Remove old backups
echo "🧹 Removing backups older than $RETENTION_DAYS days..."
find "$BACKUP_DIR" -name "kit-website_*.tar.gz" -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "kit-website_*.tar.gz.sha256" -mtime +$RETENTION_DAYS -delete

# 10. Show backup info
BACKUP_SIZE=$(du -h "${BACKUP_NAME}.tar.gz" | cut -f1)
echo ""
echo "✅ Backup completed successfully!"
echo "📦 Backup file: ${BACKUP_NAME}.tar.gz"
echo "💾 Size: $BACKUP_SIZE"
echo "📍 Location: $BACKUP_DIR"
echo "🔒 Checksum: $(cat ${BACKUP_NAME}.tar.gz.sha256 | cut -d' ' -f1)"
echo ""
echo "📊 Available backups:"
ls -lh "$BACKUP_DIR" | grep kit-website
