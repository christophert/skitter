FROM node:carbon

MAINTAINER Joseph Bartelmo <jfb3657>
MAINTAINER Christopher Tran <ctt1414>

WORKDIR /usr/src/app

COPY ./ ./

RUN npm i

EXPOSE 81

ENTRYPOINT ["/bin/bash","build.sh"]
