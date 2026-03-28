FROM node:22-slim

WORKDIR /workspace

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY services ./services

RUN pnpm install --frozen-lockfile
RUN pnpm exec turbo run build --filter=gateway-service...

EXPOSE 3000

CMD ["pnpm", "--filter", "gateway-service", "start"]
