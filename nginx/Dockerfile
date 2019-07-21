# build stage
FROM node:10-alpine as build-stage

WORKDIR /code

COPY frontend/package.json .

RUN npm cache verify
RUN npm install

COPY frontend .

RUN npm run build

# production stage
FROM nginx:1.15.12-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

COPY --from=build-stage /code/dist /dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
