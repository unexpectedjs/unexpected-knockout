/* global unexpected:true , ko:true, unexpectedKnockout:true */
/* exported ko */
ko = require('knockout');
unexpectedKnockout = require('../lib/unexpected-knockout');
unexpected = require('unexpected')
  .clone()
  .installPlugin(unexpectedKnockout);
unexpected.output.preferredWidth = 80;
