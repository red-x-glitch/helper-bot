# FROM node:latest

# # Create the directory!
# RUN mkdir -p /usr/src/helper-bot
# WORKDIR /usr/src/helper-bot

# # Copy and Install our bot
# COPY . /usr/src/helper-bot
# RUN npm install

# # Start me!
# CMD ["npm", "start"]

FROM node:18 AS build-env

COPY . /app
WORKDIR /app

RUN npm ci --omit=dev


FROM gcr.io/distroless/nodejs18-debian11
COPY --from=build-env /app /app
WORKDIR /app

CMD ["index.js"]