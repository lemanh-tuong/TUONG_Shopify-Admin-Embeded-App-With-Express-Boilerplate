
FROM ruby:3.2.1

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -  && apt-get update -qq && apt-get install -qq --no-install-recommends     nodejs   && apt-get upgrade -qq   && apt-get clean   && rm -rf /var/lib/apt/lists/*  && npm install -g yarn@1.x

ARG HOST
ENV HOST $HOST
ARG SHOPIFY_API_KEY
ENV SHOPIFY_API_KEY $SHOPIFY_API_KEY
ARG SHOPIFY_API_SECRET
ENV SHOPIFY_API_SECRET $SHOPIFY_API_SECRET
ARG SCOPES
ENV SCOPES $SCOPES
ARG API_VERSION
ENV API_VERSION $API_VERSION
ARG BACKEND_PORT
ENV BACKEND_PORT $BACKEND_PORT
ARG PORT
ENV PORT $PORT
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ARG _____ADDITIONAL_VARIABLE______APP_NAME
ENV _____ADDITIONAL_VARIABLE______APP_NAME $_____ADDITIONAL_VARIABLE______APP_NAME
ARG _____ADDITIONAL_VARIABLE______APP_EMBED_EXTENSION_UUID
ENV _____ADDITIONAL_VARIABLE______APP_EMBED_EXTENSION_UUID $_____ADDITIONAL_VARIABLE______APP_EMBED_EXTENSION_UUID

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
