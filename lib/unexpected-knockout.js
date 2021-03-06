/* global define */
// Copyright (c) 2014 Sune Simonsen <sune@we-knowhow.dk>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the 'Software'), to deal in the Software without
// restriction, including without limitation the rights to use, copy,
// modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
// BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('knockout'));
  } else if (typeof define === 'function' && define.amd) {
    define(['knockout'], factory);
  } else {
    root.weknowhow = root.weknowhow || {};
    root.weknowhow.unexpectedKnockout = factory(root.ko);
  }
})(this, function (ko) {
  return {
    name: 'unexpected-knockout',
    installInto: function (expect) {
      expect.addType({
        name: 'knockout-observable',
        base: 'wrapperObject',
        identify: function (value) {
          return ko.isObservable(value);
        },
        unwrap: function (observable) {
          return observable.peek();
        },
        prefix: function (output) {
          return output.code('ko.observable(');
        },
        suffix: function (output) {
          return output.code(')');
        },
      });

      expect.addType({
        name: 'knockout-computed',
        base: 'knockout-observable',
        identify: function (value) {
          return ko.isComputed(value);
        },
        prefix: function (output) {
          return output.code('ko.computed(');
        },
      });

      expect.addAssertion(
        '<any> [not] to be observable',
        function (expect, subject) {
          expect(ko.isObservable(subject), '[not] to be true');
        }
      );

      expect.addAssertion(
        '<any> [not] to be computed',
        function (expect, subject) {
          expect(ko.isComputed(subject), '[not] to be true');
        }
      );
    },
  };
});
