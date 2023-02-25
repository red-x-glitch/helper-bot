FROM node:18 as builder

WORKDIR /app

COPY package*.json /app
RUN npm ci --omit=dev

COPY . /app

FROM astefanutti/scratch-node

COPY --from=builder --chown=1000 /app /helper-bot
WORKDIR /helper-bot
ENTRYPOINT ["node", "index.js"]