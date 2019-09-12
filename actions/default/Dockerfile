# basic #
FROM node:12-alpine
MAINTAINER 'npm, Inc.'

# environment #
# install #
COPY . .
RUN npm ci ;

# command #
ENTRYPOINT ["node", "/index.js"]
