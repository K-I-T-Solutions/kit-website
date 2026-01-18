#!/usr/bin/env node

/**
 * Simple Webhook Server for GitHub deployments
 * Listens for GitHub webhook events and triggers deployment
 */

const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const PORT = process.env.WEBHOOK_PORT || 9000;
const SECRET = process.env.WEBHOOK_SECRET || 'change-me-in-production';
const DEPLOY_SCRIPT = '/srv/kit-website/deploy.sh';

function verifySignature(payload, signature) {
  const hmac = crypto.createHmac('sha256', SECRET);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

function runDeployment() {
  console.log('🚀 Starting deployment...');

  exec(`bash ${DEPLOY_SCRIPT}`, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Deployment failed:', error);
      console.error(stderr);
      return;
    }
    console.log('✅ Deployment successful!');
    console.log(stdout);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const signature = req.headers['x-hub-signature-256'];

      if (!signature) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'No signature provided' }));
        return;
      }

      if (!verifySignature(body, signature)) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid signature' }));
        return;
      }

      const payload = JSON.parse(body);

      // Only deploy on push to main branch
      if (payload.ref === 'refs/heads/main') {
        runDeployment();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Deployment triggered' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Ignored: not main branch' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`🎣 Webhook server listening on port ${PORT}`);
  console.log(`📝 Deploy script: ${DEPLOY_SCRIPT}`);
});
