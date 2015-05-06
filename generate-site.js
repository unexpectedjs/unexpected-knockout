/*global ko:true*/
var argv = require('minimist')(process.argv.slice(2));

ko = require('knockout');
var unexpected = require('unexpected');
unexpected.installPlugin(require('./lib/unexpected-knockout'));
var generator = require('unexpected-documentation-site-generator');
argv.unexpected = unexpected;
generator(argv);
