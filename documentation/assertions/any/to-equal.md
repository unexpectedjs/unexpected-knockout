Passes if the subject and the argument are observables or computed
with equal values.

```js
expect(ko.observable(42), 'to equal', ko.observable(42));

expect(ko.observable({
    id: '4331241234',
    name: ko.observable('test'),
    age: ko.observable(42)
}), 'to equal', ko.observable({
    id: '4331241234',
    name: ko.observable('test'),
    age: ko.observable(42)
}));

expect(ko.computed(function () {
    return {
        foo: ko.observable(42)
    }
}), 'to equal', ko.computed(function () {
    return {
        foo: ko.observable(42)
    }
}));
```

In case of a failing expectation you get the following output:

```js
expect(ko.observable('f00'), 'to equal', ko.observable('foo'));
```

```output
expected ko.observable('f00') to equal ko.observable('foo')

ko.observable(
  'f00' // should equal 'foo'
        //
        // -f00
        // +foo
)
```

This assertion can be negated using the not flag:

```js
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
}), 'not to equal', ko.observable(24));
```

In case of a failing expectation you get the following output:

```js
expect(ko.observable(42), 'not to equal', ko.observable(42));
```

```output
expected ko.observable(42) not to equal ko.observable(42)
```
