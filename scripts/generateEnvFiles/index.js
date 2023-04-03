/* eslint-disable @typescript-eslint/no-var-requires */

const { writeFileSync } = require('fs');
const { frontendDirectory, backendDirectory } = require('../consts');
const { getEnvVariablesContentFile } = require('./utils/getEnvVariablesContentFile');

const isDev = process.env.NODE_ENV === 'development';
const envVariables = getEnvVariablesContentFile(isDev);

writeFileSync(`${frontendDirectory}/.env`, envVariables, { flag: 'w' });
writeFileSync(`${backendDirectory}/.env`, envVariables, { flag: 'w' });
