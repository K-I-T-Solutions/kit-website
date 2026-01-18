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

# Copy the rest of the source
COPY . .

# Build the app
RUN pnpm run build

# =============================
# 🚀 2. Runtime Stage
# =============================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# 👉 Install pnpm again for runtime (needed for pnpm start)
RUN npm install -g pnpm

# Copy build artifacts from builder
COPY --from=builder /app ./

# Remove dev dependencies (keeps image small)
RUN pnpm prune --prod

EXPOSE 3000

# Start the app
CMD ["pnpm", "run", "start"]
