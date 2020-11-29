# Build React-app
FROM node:alpine as build
LABEL version="1.0.1"
WORKDIR /app
COPY package.json /app
RUN npm install \
    yarn --silent
COPY . /app
RUN yarn build

# Serve files
FROM nginx:1.18.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]