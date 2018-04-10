FROM node:carbon

MAINTAINER Joseph Bartelmo <jfb3657>
MAINTAINER Christopher Tran <ctt1414>

WORKDIR /usr/src/app

COPY ./package.json package.json
COPY ./src ./src

RUN npm install --only=production

EXPOSE 81
CMD [ "npm", "start" ]

