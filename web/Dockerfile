FROM node:carbon

WORKDIR /usr/src/app
COPY skitterapp /tmp/skitterapp

# temporarily have the entire webapp, build it, and move it to the app directory and delete the full repo folder
RUN cd /tmp/skitterapp && npm install && npm run build && mv build /usr/src/app && rm -rf /tmp/skitterapp

COPY skitterapp/server.js ./
COPY package.json ./
COPY build.sh ./
COPY csr.json ./

EXPOSE 80

ENTRYPOINT ["./build.sh"]
