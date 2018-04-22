FROM node:carbon

RUN npm install -g serve
WORKDIR /usr/src/app
COPY skitterapp/package.json ./package.json
COPY skitterapp/package-lock.json ./package-lock.json
RUN npm install 

COPY skitterapp ./
RUN npm run build

EXPOSE 5000

ENTRYPOINT ["/usr/local/bin/serve", "-s", "build"]
