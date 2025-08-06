# 1. Base Stage: A clean Node.js environment
FROM node:18-alpine AS base

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
RUN npm install

# 4. Builder Stage: Build the application
FROM base AS builder
WORKDIR /app
# First, copy the installed dependencies from the installer stage
COPY --from=installer /app/ .
# Then, copy the pruned source code from the pruner stage
COPY --from=pruner /app/out/full/ .
# Copy turbo.json for Turborepo configuration
COPY --from=pruner /app/turbo.json ./turbo.json
# Now, the workspace is complete. Run the build.
RUN npm run build -- --filter=payload

# 5. Runner Stage: The final, small, production-ready image
FROM base AS runner
WORKDIR /app
# Don't run production as root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
# Copy required files from the builder stage
COPY --from=builder /app/apps/payload/package.json .
COPY --from=builder /app/apps/payload/dist ./dist
COPY --from=builder /app/apps/payload/build ./build
# We must copy the entire node_modules from the builder, as it contains all workspace dependencies
COPY --from=builder /app/node_modules ./node_modules

USER nextjs
EXPOSE 3000
CMD ["node", "dist/server.js"]