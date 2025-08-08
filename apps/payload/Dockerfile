# 1. Base Stage: A clean Node.js environment
FROM node:18-alpine AS base

ARG PAYLOAD_SECRET
ARG DATABASE_URI
ARG NODE_ENV=production

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

# 4. Builder Stage: Build the application
FROM base AS builder
WORKDIR /app

# Set build-time arguments for environment variables
ARG PAYLOAD_SECRET
ARG DATABASE_URI
ARG NODE_ENV=production

# Set environment variables for build
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV NODE_ENV=$NODE_ENV
ENV NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Copy .env file if it exists (for local development)
COPY .env* ./
# First, copy the installed dependencies from the installer stage
COPY --from=installer /app/ .
# Then, copy the pruned source code from the pruner stage
COPY --from=pruner /app/out/full/ .
# Copy turbo.json for Turborepo configuration
COPY --from=pruner /app/turbo.json ./turbo.json


# Now, the workspace is complete. Run the build.
RUN npm install -g turbo

RUN npm run build -- --filter=payload

# 5. Runner Stage: The final, small, production-ready image
FROM base AS runner
WORKDIR /app
# Don't run production as root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
# Copy required files from the builder stage
COPY --from=builder /app/apps/payload/package.json .
COPY --from=builder /app/apps/payload/.next ./.next
COPY --from=builder /app/apps/payload/public ./public
# We must copy the entire node_modules from the builder, as it contains all workspace dependencies
COPY --from=builder /app/apps/node_modules ./node_modules

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]