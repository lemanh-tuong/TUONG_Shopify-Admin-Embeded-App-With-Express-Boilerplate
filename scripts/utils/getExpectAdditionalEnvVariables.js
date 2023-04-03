/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync } = require('fs');
const { prefixOfAdditionalVariables, envExampleDirectory } = require('../consts/index.js');
require('dotenv').config();

/**
 *
 * @returns {Array<string>}
 */
const getExpectAdditionalEnvVariables = () => {
  const envSchemaLines = readFileSync(envExampleDirectory).toString('utf-8').split('\n');
  return envSchemaLines.reduce((result, line) => {
    const [envVariableName] = line.split('=');
    if (envVariableName.startsWith(prefixOfAdditionalVariables)) {
      return result.concat(envVariableName);
    }
    return result;
  }, []);
};

module.exports = {
  getExpectAdditionalEnvVariables,
};
