# =============================
# 🧱 1. Build Stage
# =============================
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files first (for caching)
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy rest of the source
COPY . .

# Build Next.js app
RUN pnpm run build

# =============================
# 🚀 2. Runtime Stage
# =============================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy build artifacts from builder
COPY --from=builder /app ./

# Ensure minimal image size
RUN rm -rf node_modules && pnpm install --prod --frozen-lockfile

EXPOSE 3000

# Start Next.js server
CMD ["pnpm", "run", "start"]
