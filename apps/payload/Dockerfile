# 1. Base Stage: A clean Node.js environment
FROM node:18-alpine AS base

ARG PAYLOAD_SECRET
ARG DATABASE_URI
ARG NODE_ENV=production

# Install netcat and postgresql-client for database connectivity check
RUN apk add --no-cache netcat-openbsd postgresql-client

# 2. Pruner Stage: Create the pruned Turborepo workspace
FROM base AS pruner
WORKDIR /app
COPY . .
# Install turbo globally only in this stage to run the prune command
RUN npm install -g turbo
RUN turbo prune --scope=payload --docker

# 3. Installer Stage: Install only the required dependencies
FROM base AS installer
WORKDIR /app
# Copy the lockfile and pruned package.json's from the pruner stage
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
# Install dependencies
RUN npm ci

# 4. Final Stage: Copy everything and prepare for runtime build
FROM base AS runner
WORKDIR /app

# Set environment variables
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Copy .env file if it exists (for local development)
COPY .env* ./
# Copy the installed dependencies from the installer stage
COPY --from=installer /app/ .
# Copy the pruned source code from the pruner stage
COPY --from=pruner /app/out/full/ .
# Copy turbo.json for Turborepo configuration
COPY --from=pruner /app/turbo.json ./turbo.json

# Copy the start script
COPY apps/payload/start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Don't run production as root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory to the nextjs user
RUN chown -R nextjs:nodejs /app

USER nextjs
EXPOSE 3000

# Use the start script
CMD ["/app/start.sh"]