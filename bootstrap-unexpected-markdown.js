/* global unexpected:true, ko:true */
/* exported ko */
ko = require('knockout');
unexpected = require('unexpected');
unexpected.output.preferredWidth = 80;
unexpected.use(require('./lib/unexpected-knockout'));
