# Stage 1 — deps
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2 — final
FROM node:22-alpine AS final
WORKDIR /app

# Copy production dependencies from Stage 1
COPY --from=deps /app/node_modules ./node_modules

# Copy the entire src directory tree (routes, data, index.js, etc.)
COPY src/ ./src/

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# ADJUSTED: Points to your actual entry point file
CMD ["node", "src/index.js"]