# https://www.elastic.co/blog/how-to-make-a-dockerfile-for-elasticsearch
FROM mcpayment/ubuntu1404-java8

MAINTAINER Joseph Bartelmo <jfb3657>
MAINTAINER Christopher Tran <ctt1414>

WORKDIR /usr/share/elasticsearch


RUN apt-get update && apt-get install curl -y
#RUN apt-get update && apt-get upgrade -y
RUN wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.2.2.tar.gz
RUN tar -xf elasticsearch-5.2.2.tar.gz

COPY elasticsearch.yml /usr/share/elasticsearch/elasticsearch-5.2.2/config/
ENV PATH=$PATH:/usr/share/elasticsearch/elasticsearch-5.2.2/bin
EXPOSE 9300 9300

#install shield for SSL
RUN yes | elasticsearch-plugin install x-pack
#RUN \
#  mv /usr/share/elasticsearch/elasticsearch-5.2.2/plugins/x-pack /usr/share/elasticsearch/elasticsearch-5.2.2/plugins/.removing-x-pack && \
#  mv /usr/share/elasticsearch/elasticsearch-5.2.2/plugins/.removing-x-pack /usr/share/elasticsearch/elasticsearch-5.2.2/plugins/x-pack && \
#  /usr/share/elasticsearch/elasticsearch-5.2.2/bin/elasticsearch-plugin remove x-pack

RUN chmod -R 777 ./
RUN mkdir /ssl
RUN chmod -R 777 /ssl
COPY ./ ./

#elastic user
RUN groupadd -g 1000 elastic && useradd elastic -u 1000 -g 1000
#ENTRYPOINT ["/bin/bash"]
#ENTRYPOINT ["elasticsearch"]
ENTRYPOINT ["/bin/bash","build.sh"]
