FROM ruby:2.6.4-alpine3.10

RUN apk --update add --no-cache \
  build-base \ 
  nodejs \ 
  tzdata \
  postgresql-dev \
  postgresql-client \ 
  libxslt-dev \
  libxml2-dev \
  curl \ 
  wget \
  bash

RUN mkdir /backend

WORKDIR /backend

COPY Gemfile Gemfile.lock ./

RUN bundle install --jobs 4

COPY . ./
