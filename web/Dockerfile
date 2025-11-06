# Next.js app Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# BACKEND_ORIGIN can be passed at build time if rewrites depend on it
ARG BACKEND_ORIGIN
ENV BACKEND_ORIGIN=${BACKEND_ORIGIN}
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Copy only what's needed to run
COPY --from=builder /app .
# Add curl for healthcheck
RUN apk add --no-cache curl
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=3s --retries=5 CMD curl -f http://localhost:3000 || exit 1
CMD ["npm", "start"]
