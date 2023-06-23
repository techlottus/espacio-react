FROM node:14.17.6-slim as builder
ARG NPM_TOKEN 
WORKDIR /app
COPY .npmrc .npmrc 
COPY package.json package.json 
RUN npm install 
COPY . .
RUN rm -f .npmrc
EXPOSE 3000
CMD [ "npm", "run", "start" ]