/* eslint-disable @typescript-eslint/no-var-requires */
const { fixedVariables, prefixOfAdditionalVariables } = require('../../consts');
const { getExpectAdditionalEnvVariables } = require('../../utils/getExpectAdditionalEnvVariables');
require('dotenv').config();

const getAdditionalEnvVariables = () => {
  const expectAdditionalEnvVariables = getExpectAdditionalEnvVariables();

  /** @type {Record<string, string>} */
  let result = {};
  expectAdditionalEnvVariables.forEach(variable => {
    if (variable.startsWith(prefixOfAdditionalVariables)) {
      const value = process.env[variable];
      if (!value) {
        console.warn(`Building the app without an ${variable}`);
      } else {
        result = {
          ...result,
          [variable]: value,
        };
      }
    }
  });

  Object.keys(process.env).forEach(variable => {
    if (variable.startsWith(prefixOfAdditionalVariables) && !expectAdditionalEnvVariables.includes(variable)) {
      console.warn(`Unexpect variable ${variable}`);
    }
  });

  return result;
};

const getFixedEnvVariables = () => {
  /** @type {Record<string, string>} */
  let result = {};
  fixedVariables.forEach(variable => {
    const value = process.env[variable];
    if (!value) {
      console.warn(`Building the app without an ${variable}`);
    } else {
      result = {
        ...result,
        [variable]: value,
      };
    }
  });
  return result;
};

/**
 *
 * @param {boolean} isDev
 * @returns {string}
 */
const getEnvVariablesContentFile = isDev => {
  /** @type {Record<string, string>} */
  let envVariablesObject = {};
  if (isDev) {
    envVariablesObject = getAdditionalEnvVariables();
  } else {
    envVariablesObject = {
      ...getFixedEnvVariables(),
      ...getAdditionalEnvVariables(),
    };
  }
  return Object.entries(envVariablesObject).reduce((result, [variable, value]) => {
    return result.concat(`${variable}=${value}\n`);
  }, '');
};

module.exports = {
  getEnvVariablesContentFile,
};
