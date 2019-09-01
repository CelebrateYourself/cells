# build stage
FROM node:10-alpine as build-stage

WORKDIR /code
ARG API_URL
ENV VUE_APP_API_URL ${API_URL}
ENV PATH /code/node_modules/.bin:$PATH

COPY frontend/package.json .

RUN npm cache verify
RUN npm install
RUN npm install -g @vue/cli

COPY frontend .

RUN npm run build

# production stage
FROM nginx:1.15.12-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

COPY --from=build-stage /code/dist /dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
