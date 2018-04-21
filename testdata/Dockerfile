FROM ubuntu:latest

RUN apt-get update && apt-get install mysql-client curl -y

COPY ./ ./
RUN chmod +x build.sh && chmod +x skits.sh
ENTRYPOINT ["/bin/bash", "./build.sh"]
