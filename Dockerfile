FROM node:latest

# Create the directory!
RUN mkdir -p /usr/src/helper-bot
WORKDIR /usr/src/helper-bot

# Copy and Install our bot
COPY package.json /usr/src/helper-bot
RUN npm install

# Our precious bot
COPY . /usr/src/helper-bot

# Start me!
CMD ["npm", "start"]