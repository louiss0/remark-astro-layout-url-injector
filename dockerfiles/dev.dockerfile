FROM node:18-buster-slim

WORKDIR /app


COPY ./package.json ./

RUN npm install


COPY ./ ./

EXPOSE 51204


CMD [ "npm", "run","dev" ]
