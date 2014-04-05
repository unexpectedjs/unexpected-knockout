ko = require('knockout');
expect = require('unexpected');
unexpectedKnockout = process.env.COVERAGE ?
    require('../lib-cov/unexpected-knockout') :
    require('../lib/unexpected-knockout');
