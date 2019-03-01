'use strict';

var createError = require('errno').create;

var RPGcoreNodeError = createError('RPGcoreNodeError');

var RPCError = createError('RPCError', RPGcoreNodeError);

module.exports = {
  Error: RPGcoreNodeError,
  RPCError: RPCError
};
