/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFileSync } = require('fs');
const { fixedVariables } = require('../consts');
const { getExpectAdditionalEnvVariables } = require('../utils/getExpectAdditionalEnvVariables');

const expectAdditionalEnvVariables = getExpectAdditionalEnvVariables();

const envOfDockerfile = [...fixedVariables, ...expectAdditionalEnvVariables]
  .map(variableName => {
    return [`ARG ${variableName}`, `ENV ${variableName} $${variableName}`].join('\n');
  })
  .join('\n');

const Dockerfile = `
FROM ruby:3.2.1

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -\
  && apt-get update -qq && apt-get install -qq --no-install-recommends \
    nodejs \
  && apt-get upgrade -qq \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*\
  && npm install -g yarn@1.x

${envOfDockerfile}

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
`;

writeFileSync(process.cwd() + '/Dockerfile', Dockerfile, { flag: 'w' });
