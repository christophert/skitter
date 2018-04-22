FROM ruby:latest
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs curl 

COPY ./ ./
RUN cd src && bundle install
RUN cd ..

ENTRYPOINT ["/bin/bash", "./build.sh"]
