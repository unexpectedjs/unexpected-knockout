/*global describe, it, ko, expect, unexpectedKnockout*/
expect.installPlugin(unexpectedKnockout);

describe('unexpected-knockout', function () {
    describe('to be equal', function () {
        it('succeeds when the subject and the argument are observables with equal values', function () {
            expect(ko.observable(42), 'to equal', ko.observable(42));

            expect(ko.observable({ foo: 42, bar: 24 }), 'to equal', ko.observable({ foo: 42, bar: 24 }));

            expect(ko.observable(ko.observable(42)), 'to equal', ko.observable(ko.observable(42)));
            expect(ko.observable(ko.observable(42)), 'not to equal', ko.observable(ko.observable(24)));

            expect(ko.observable({
                foo: ko.observable(42)
            }), 'to equal', ko.observable({
                foo: ko.observable(42)
            }));
        });

        it('handles circular structures', function () {
            var x = ko.observable();
            x({ foo: x });
            var y = ko.observable();
            y({ foo: y });

            expect(function () {
                expect(x, 'to equal', y);
            }, 'to throw', 'Cannot compare circular structures');
        });
    });

    describe('not to equal', function () {
        it('succeeds when the subject and argument the are observables with values that are not equal', function () {
            expect(ko.observable(42), 'not to equal', ko.observable(24));
            expect(ko.observable({ foo: 42, bar: 23 }), 'not to equal', ko.observable({ foo: 42, bar: 24 }));
            expect(ko.observable({ foo: 42, bar: 23 }), 'not to equal', 42);

            expect(ko.observable({
                foo: ko.observable(42)
            }), 'not to equal', ko.observable({
                foo: ko.observable(24)
            }));

            expect(ko.observable({
                foo: ko.observable(42)
            }), 'not to equal', ko.observable({
                bar: ko.observable(42)
            }));
        });

        it('succeeds when the subject is observable and the arguments is not observable', function () {
            expect(ko.observable(42), 'not to equal', 24);
        });

        it('succeeds when the subject is not observable and the arguments is observable', function () {
            expect(42, 'not to equal', ko.observable(24));
        });
    });

    describe('to have properties', function () {
        it('succeeds if all the properties in the given object has an equal value in the subject', function () {
            // This is just an example of how things compose
            expect({
                foo: ko.observable(42),
                bar: ko.observable(42),
                baz: 42
            }, 'to have properties', {
                foo: ko.observable(42),
                baz: 42
            });
        });
    });

    it('provides custom inspection for observables', function () {
        expect(function () {
            expect(ko.observable(42), 'to equal', ko.observable(24));
        }, 'to throw', 'expected ko.observable(42) to equal ko.observable(24)');
    });

    describe('to be observable', function () {
        it('succeeds if subject is a Knockout observable', function () {
            expect(ko.observable(42), 'to be observable');
        });

        it('fails if the subject is not a Knockout observable', function () {
            expect(function () {
                expect(42, 'to be observable');
            }, 'to throw', 'expected 42 to be observable');
        });
    });

    describe('not to be observable', function () {
        it('succeeds if subject is not a Knockout observable', function () {
            expect(42, 'not to be observable');
        });

        it('fails if the subject is a Knockout observable', function () {
            expect(function () {
                expect(ko.observable(42), 'not to be observable');
            }, 'to throw', 'expected ko.observable(42) not to be observable');
        });
    });
});
