FROM node:14-slim

RUN apt update

RUN apt install git python make g++ gcc -y && apt install build-essential

WORKDIR /usr/src/
COPY package.json .
RUN npm install

COPY . .

WORKDIR /usr/src/proxyServer
RUN npm install

ENV EXTEND_ESLINT true
RUN npm run build

CMD npm run serve-production-proxy
