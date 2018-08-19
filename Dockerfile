FROM node:9.9.0

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json
RUN npm install

# copy all files
COPY . /usr/src/app

# set ENVs
ENV NODE_ENV production

# start it up
CMD [ "npm", "start" ]

EXPOSE 80
