'use strict';

var path = require('path');
var should = require('chai').should();
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('#defaultConfig', function() {
  var expectedExecPath = path.resolve(__dirname, '../../bin/rpgd');

  it('will return expected configuration', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'rpgd',
        'web'
      ],
      servicesConfig: {
        rpgd: {
          spawn: {
            datadir: process.env.HOME + '/.rpgcore/data',
            exec: expectedExecPath
          }
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.rpgcore/rpgcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig();
    info.path.should.equal(home + '/.rpgcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal(['rpgd', 'web']);
    var rpgd = info.config.servicesConfig.rpgd;
    should.exist(rpgd);
    rpgd.spawn.datadir.should.equal(home + '/.rpgcore/data');
    rpgd.spawn.exec.should.equal(expectedExecPath);
  });
  it('will include additional services', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'rpgd',
        'web',
        'insight-api-rpg',
        'insight-ui-rpg'
      ],
      servicesConfig: {
        rpgd: {
          spawn: {
            datadir: process.env.HOME + '/.rpgcore/data',
            exec: expectedExecPath
          }
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.rpgcore/rpgcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig({
      additionalServices: ['insight-api-rpg', 'insight-ui-rpg']
    });
    info.path.should.equal(home + '/.rpgcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal([
      'rpgd',
      'web',
      'insight-api-rpg',
      'insight-ui-rpg'
    ]);
    var rpgd = info.config.servicesConfig.rpgd;
    should.exist(rpgd);
    rpgd.spawn.datadir.should.equal(home + '/.rpgcore/data');
    rpgd.spawn.exec.should.equal(expectedExecPath);
  });
});
