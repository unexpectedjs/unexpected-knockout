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
}(this, function (ko) {
    return function (expect) {
        expect.addType({
            name: 'knockout observable',
            identify: function (observable) {
                return ko.isObservable(observable);
            },
            equal: function (a, b, equal) {
                return a === b || equal(a(), b());
            },
            inspect: function (output, observable, inspect) {
                output.text('ko.observable(');
                output.append(inspect(observable()));
                return output.text(')');
            },
            diff: function (actual, expected, output, diff, inspect) {
                var comparison = diff(actual(), expected());
                if (!comparison) {
                    return null;
                }

                if (comparison.inline) {
                    return {
                        inline: true,
                        diff: output.text('ko.observable(').append(comparison.diff).text(')')
                    };
                } else {
                    return {
                        inline: true,
                        diff: output.text('ko.observable(').nl()
                            .indentLines()
                            .i().block(function () {
                                this.append(inspect(actual())).block(function () {
                                    this.error('should be: ').block(inspect(expected())).nl()
                                        .append(comparison.diff);
                                    this.prependLinesWith(function () {
                                        this.error(' // ');
                                    });
                                });
                            }).nl()
                            .outdentLines()
                            .text(')')
                    };
                }
            }
        });

        expect.addAssertion('[not] to be observable', function (expect, subject) {
            expect(ko.isObservable(subject), '[not] to be true');
        });
    };
}));
