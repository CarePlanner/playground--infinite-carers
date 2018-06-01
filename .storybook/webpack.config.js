const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => {

  defaultConfig.module.rules.push({
    test: /\.csv$/,
    exclude: /node_modules/,
    loader: 'csv-loader'
  });
  defaultConfig.resolve.extensions.push('.csv');

  return defaultConfig;
};
