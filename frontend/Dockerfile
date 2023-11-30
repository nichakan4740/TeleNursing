### STAGE 1: Build ###
FROM node:16.3.0-alpine3.13  AS build-stage
WORKDIR /app
COPY package.json /app/package.json
RUN npm install 
COPY . .
RUN npm run build
 
### STAGE 2: Run ###
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./frontend/nginx/default.conf :/etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



