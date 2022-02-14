FROM node:15-slim

RUN apt update

RUN apt install git python make g++ gcc -y
RUN apt-get install build-essential -y

WORKDIR /usr/src/

COPY package.json .
COPY package-lock.json .
RUN npm ci

RUN mkdir proxyServer
WORKDIR /usr/src/proxyServer

COPY ./proxyServer/package.json .
COPY ./proxyServer/package-lock.json .
RUN npm ci

WORKDIR /usr/src/

COPY . .

ENV EXTEND_ESLINT "true"

RUN npm run build

WORKDIR /usr/src

CMD npm run serve-production-proxy
