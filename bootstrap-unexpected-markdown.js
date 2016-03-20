/*global unexpected:true, ko:true*/
ko = require('knockout');
unexpected = require('unexpected');
unexpected.output.preferredWidth = 80;
unexpected.use(require('./lib/unexpected-knockout'));
