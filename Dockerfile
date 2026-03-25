FROM node:22-bookworm-slim

WORKDIR /workspace

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY services ./services

RUN pnpm install --frozen-lockfile

CMD ["pnpm", "--filter", "gateway-service", "exec", "tsx", "src/server.ts"]
