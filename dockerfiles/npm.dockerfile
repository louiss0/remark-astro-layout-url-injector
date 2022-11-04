FROM node:18-buster-slim

WORKDIR /app

RUN npm install -g pnpm 

ENTRYPOINT [ "npm" ] 