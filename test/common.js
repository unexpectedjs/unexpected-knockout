ko = require('knockout');
unexpectedKnockout = process.env.COVERAGE ?
    require('../lib-cov/unexpected-knockout') :
    require('../lib/unexpected-knockout');
unexpected = require('unexpected').clone()
    .installPlugin(unexpectedKnockout);
unexpected.output.preferredWidth = 80;
