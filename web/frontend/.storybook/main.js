// https://storybook.js.org/docs/react/builders/vite
const { mergeConfig } = require("vite");
const viteTsconfig = require("vite-tsconfig-paths");
const tsconfigPaths = viteTsconfig.default;

/** @type {import('@storybook/builder-vite').StorybookViteConfig} */
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-designs",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
    // we don't want to muck up the data when we're working on the builder
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    // return the customized config
    return mergeConfig(config, {
      // customize the Vite config here
      plugins: [tsconfigPaths()],
    });
  },
};
