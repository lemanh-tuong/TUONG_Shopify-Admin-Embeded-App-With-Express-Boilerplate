const fixedVariables = [
  'HOST',
  'SHOPIFY_API_KEY',
  'SHOPIFY_API_SECRET',
  'SCOPES',
  'API_VERSION',
  'BACKEND_PORT',
  'PORT',
  'NODE_ENV',
];

/** WARNING: Update "vite.config.js", ".env.example" và "các file type definition cho env" nếu muốn tuỳ chỉnh tiền tố "_____ADDITIONAL_VARIABLE______" */
const prefixOfAdditionalVariables = '_____ADDITIONAL_VARIABLE______';

// WARNING: Update nếu có sự thay đổi cấu trúc thư mục
const frontendDirectory = process.cwd() + '/web/frontend';
const backendDirectory = process.cwd() + '/web';
const envExampleDirectory = process.cwd() + '/.env.example';
const deployHerokuWorkflowDirectory = process.cwd() + '/.github/workflows/deploy-heroku.yaml';

module.exports = {
  fixedVariables,
  prefixOfAdditionalVariables,
  frontendDirectory,
  backendDirectory,
  envExampleDirectory,
  deployHerokuWorkflowDirectory,
};
