FROM node:12-alpine
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
COPY package.json .
RUN yarn
RUN mkdir /frontend
WORKDIR /frontend