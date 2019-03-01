'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export rpgcore-lib', function() {
    var rpgcore = require('../');
    should.exist(rpgcore.lib);
    should.exist(rpgcore.lib.Transaction);
    should.exist(rpgcore.lib.Block);
  });
});
