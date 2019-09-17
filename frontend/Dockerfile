FROM node:10-alpine

WORKDIR /code
ENV PATH /code/node_modules/.bin:$PATH

COPY ./package.json .
RUN npm cache verify
RUN npm install
RUN npm install -g @vue/cli

COPY . .

EXPOSE 8080