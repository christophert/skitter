docker build -t my-es-image .
#docker volume create --name esdata
docker run --rm -ti -p 9200:9200 -v esdata:/usr/share/elasticsearch/data my-es-image
