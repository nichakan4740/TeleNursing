### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /frontend
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build 
 
### STAGE 2: Run ###
FROM nginx:latest
COPY --from=build-stage /frontend/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


