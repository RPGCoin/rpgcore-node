'use strict';

var path = require('path');

/**
 * Will return the path and default rpgcore-node configuration on environment variables
 * or default locations.
 * @param {Object} options
 * @param {String} options.network - "testnet" or "livenet"
 * @param {String} options.datadir - Absolute path to rpgcoin database directory
 */
function getDefaultBaseConfig(options) {
  if (!options) {
    options = {};
  }
  return {
    path: process.cwd(),
    config: {
      network: options.network || 'livenet',
      port: 3001,
      services: ['rpgd', 'web'],
      servicesConfig: {
        rpgd: {
          spawn: {
            datadir: options.datadir || path.resolve(process.env.HOME, '.rpg'),
            exec: path.resolve(__dirname, '../../bin/rpgd')
          }
        }
      }
    }
  };
}

module.exports = getDefaultBaseConfig;
