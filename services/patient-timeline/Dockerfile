FROM node:22-slim

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY services ./services

RUN pnpm install --frozen-lockfile
RUN pnpm exec turbo run build --filter=patient-timeline...

EXPOSE 4001

CMD ["pnpm", "--filter", "patient-timeline", "start"]