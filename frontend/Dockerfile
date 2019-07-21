FROM node:10-alpine

WORKDIR /code

COPY ./package.json .
RUN npm cache verify
RUN npm install

COPY . .

EXPOSE 8080