Passes if the subject is a Knockout computed.

```js
expect(
  ko.computed(function () {
    return 42;
  }),
  'to be observable'
);
```

In case of a failing expectation you get the following output:

```js
expect(ko.observable(42), 'to be computed');
```

```output
expected ko.observable(42) to be computed
```

This assertion can be negated using the not flag:

```js
expect(ko.observable(42), 'not to be computed');
```

In case of a failing expectation you get the following output:

```js
expect(
  ko.computed(function () {
    return 42;
  }),
  'not to be computed'
);
```

```output
expected ko.computed(42) not to be computed
```
