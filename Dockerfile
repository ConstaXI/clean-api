FROM node:16
WORKDIR /usr/src/clean-api
COPY ./package.json .
RUN npm install --only=prod
