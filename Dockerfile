FROM node:9.9.0

WORKDIR /usr/src/app

# install stuff
RUN npm install nodemon -g
RUN npm install webpack@4.10.1 -g
RUN npm install webpack-cli -g

COPY ./package.json /usr/src/app/package.json
RUN npm install

# copy all files
COPY . /usr/src/app

# make dist directory
RUN mkdir -p dist

# build js
RUN mkdir -p dist/js
RUN webpack --config webpack.prod.js -p

# set ENVs
ENV NODE_ENV production

# start it up
CMD [ "npm", "start" ]

EXPOSE 80
