FROM node:22-slim

WORKDIR /workspace

# This command enables Corepack, a tool shipped with Node.js to manage package managers (like pnpm, yarn, and npm). 
# It ensures the correct package manager versions specified in your project are used when running subsequent commands in the Docker image.
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY services ./services

RUN pnpm install --frozen-lockfile
RUN pnpm exec turbo run build --filter=auth-service...

EXPOSE 3001

CMD ["pnpm", "--filter", "auth-service", "start"]
