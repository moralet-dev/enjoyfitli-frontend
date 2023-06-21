FROM node:19.4.0 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
RUN npm install --silent
COPY . /app
RUN npm run build

#FROM node:19.4.0 as develop-stage
#
#WORKDIR /app
#COPY package*.json ./
#RUN yarn install
#
#COPY . .
#
#FROM develop-stage as build-stage
#RUN yarn build