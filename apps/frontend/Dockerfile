# 1. Base Stage: A clean Node.js environment
FROM node:18-alpine AS base

# 2. Pruner Stage: Create the pruned Turborepo workspace
FROM base AS pruner
WORKDIR /app
COPY . .
# Install turbo globally only in this stage to run the prune command
RUN npm install -g turbo
RUN turbo prune --scope=frontend --docker

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
# Now, the workspace is complete. Run the build.
RUN npm run build -- --filter=frontend

# 5. Runner Stage: The final, small, production-ready image
FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Copy required files from the builder stage
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "apps/frontend/server.js"]