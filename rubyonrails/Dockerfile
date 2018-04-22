FROM ruby:latest
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

COPY ./ /api
WORKDIR /api
RUN bundle install

ENTRYPOINT ["bundle exec rails s -p 3000 -b '0.0.0.0'"]
