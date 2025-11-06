# Express backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev || npm install --omit=dev \
	&& apk add --no-cache curl
COPY . .
# Default to port 5000 in container; can be overridden
ENV PORT=5000
EXPOSE 5000
HEALTHCHECK --interval=10s --timeout=3s --retries=5 CMD curl -f http://localhost:${PORT}/health || exit 1
CMD ["npm", "start"]
