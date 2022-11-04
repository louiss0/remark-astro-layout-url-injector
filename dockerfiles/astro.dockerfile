FROM node:18-buster-slim

WORKDIR /app

RUN npm install -g astro 

EXPOSE 3000

ENTRYPOINT [ "astro" ] 