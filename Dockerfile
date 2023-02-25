FROM node:18 as builder

RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

WORKDIR /app

COPY package*.json /app
RUN npm ci --omit=dev && /usr/local/bin/node-prune

COPY . /app

FROM astefanutti/scratch-node

COPY --from=builder --chown=1000 /app /helper-bot
WORKDIR /helper-bot
ENTRYPOINT ["node", "index.js"]