/*global describe, it, ko, unexpected*/
var expect = unexpected.clone();

describe('unexpected-knockout', function () {
    expect.output.preferredWidth = 150;

    describe('to equal', function () {
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

            expect(ko.computed(function () {
                return 42;
            }), 'to equal', ko.computed(function () {
                return 42;
            }));

            expect(ko.computed(function () {
                return ko.computed(function () {
                    return 42;
                });
            }), 'to equal', ko.computed(function () {
                return ko.computed(function () {
                    return 42;
                });
            }));
        });

        it('fails when the subject and the argument are not equal', function () {
            expect(function () {
                expect(ko.computed(function () {
                    return ko.computed(function () {
                        return 42;
                    });
                }), 'to equal', ko.computed(function () {
                    return ko.computed(function () {
                        return 24;
                    });
                }));
            }, 'to throw',
                   "expected ko.computed(ko.computed(42)) to equal ko.computed(ko.computed(24))\n" +
                   "\n" +
                   "ko.computed(ko.computed(\n" +
                   "  42 // should equal 24\n" +
                   "))");

            expect(function () {
                expect(ko.observable(ko.observable(42)), 'to equal', ko.observable(ko.observable(24)));
            }, 'to throw',
                   "expected ko.observable(ko.observable(42)) to equal ko.observable(ko.observable(24))\n" +
                   "\n" +
                   "ko.observable(ko.observable(\n" +
                   "  42 // should equal 24\n" +
                   "))");
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

            expect(ko.computed(function () {
                return 42;
            }), 'not to equal', ko.computed(function () {
                return 24;
            }));

            expect(ko.computed(function () {
                return ko.computed(function () {
                    return 42;
                });
            }), 'not to equal', ko.computed(function () {
                return ko.computed(function () {
                    return 24;
                });
            }));

            expect(ko.computed(function () {
                return ko.computed(function () {
                    return 42;
                });
            }), 'not to equal', ko.computed(function () {
                return ko.observable(function () {
                    return 42;
                });
            }));
        });

        it('succeeds when the subject is observable and the arguments is not observable', function () {
            expect(ko.observable(42), 'not to equal', 24);
        });

        it('succeeds when the subject is not observable and the arguments is observable', function () {
            expect(42, 'not to equal', ko.observable(24));
        });

        it('fails when the subject and the argument are equal', function () {
            expect(function () {
                expect(ko.computed(function () {
                    return ko.computed(function () {
                        return 42;
                    });
                }), 'not to equal', ko.computed(function () {
                    return ko.computed(function () {
                        return 42;
                    });
                }));
            }, 'to throw', "expected ko.computed(ko.computed(42)) not to equal ko.computed(ko.computed(42))");

            expect(function () {
                expect(ko.observable(ko.observable(42)), 'not to equal', ko.observable(ko.observable(42)));
            }, 'to throw', "expected ko.observable(ko.observable(42)) not to equal ko.observable(ko.observable(42))");
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
        }, 'to throw',
               'expected ko.observable(42) to equal ko.observable(24)\n' +
               "\n" +
               "ko.observable(\n" +
               "  42 // should equal 24\n" +
               ")");
    });

    describe('to be observable', function () {
        it('succeeds if subject is a Knockout observable', function () {
            expect(ko.observable(42), 'to be observable');
        });

        it('succeeds if the subject is a Knockout computed observables', function () {
            expect(ko.computed(function () {
                return 42;
            }), 'to be observable');
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

        it('fails if the subject is a Knockout observable', function () {
            expect(function () {
                expect(ko.observable(42), 'not to be observable');
            }, 'to throw', 'expected ko.observable(42) not to be observable');

            expect(function () {
                expect(ko.computed(function () {
                    return 42;
                }), 'not to be observable');
            }, 'to throw', 'expected ko.computed(42) not to be observable');
        });
    });

    describe('to be computed', function () {
        it('succeeds if subject is a Knockout computed observable', function () {
            expect(ko.computed(function () {
                return 42;
            }), 'to be computed');
        });

        it('fails if the subject is not a Knockout computed observable', function () {
            expect(function () {
                expect(42, 'to be computed');
            }, 'to throw', 'expected 42 to be computed');

            expect(function () {
                expect(ko.observable(42), 'to be computed');
            }, 'to throw', 'expected ko.observable(42) to be computed');
        });
    });

    describe('not to be computed', function () {
        it('succeeds if subject is not a Knockout computed observable', function () {
            expect(42, 'not to be computed');
            expect(ko.observable(42), 'not to be computed');
        });

        it('fails if the subject is a Knockout computed observable', function () {
            expect(function () {
                expect(ko.computed(function () {
                    return 42;
                }), 'not to be computed');
            }, 'to throw', 'expected ko.computed(42) not to be computed');
        });
    });
});
