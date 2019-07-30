'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export tripicore-lib', function() {
    var tripicore = require('../');
    should.exist(tripicore.lib);
    should.exist(tripicore.lib.Transaction);
    should.exist(tripicore.lib.Block);
  });
});
