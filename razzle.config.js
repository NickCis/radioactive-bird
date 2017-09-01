'use strict';

const path = require('path');
const { NormalModuleReplacementPlugin } = require('webpack');
const targetToFolder = {
  node: 'server',
  web: 'client',
}

module.exports = {
  modify(config, { target, dev }, webpack) {
    config.plugins = (config.plugins || []).concat([
      new NormalModuleReplacementPlugin(/^~/, resource => {
        resource.request = resource.request.replace(/^~/, path.join(config.context, 'src'));
      }),
      new NormalModuleReplacementPlugin(/{target}/, resource => {
        resource.request = resource.request.replace(/{target}/, targetToFolder[target]);
      }),
    ]);
    return config;
  },
};
