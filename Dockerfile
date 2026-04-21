# ── Stage 1: сборка фронтенда ──────────────────────────────
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ── Stage 2: сборка бэкенда ────────────────────────────────
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend

RUN apk add --no-cache openssl

COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./
RUN npx prisma generate
RUN npm run build

# ── Stage 3: prod runner ───────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl

# Только prod зависимости
COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/prisma ./prisma
RUN npx prisma generate

# Скомпилированный бэк
COPY --from=backend-builder /app/backend/dist ./dist

# Собранный фронт отдаём как статику
COPY --from=frontend-builder /app/frontend/dist ./public

EXPOSE 3000

CMD ["node", "dist/server.js"]