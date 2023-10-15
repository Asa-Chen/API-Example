FROM node
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json package-lock.json /usr/app/
RUN npm install
COPY . /usr/app
EXPOSE 8081
CMD node ./src/index.js

