Passes if the subject is a Knockout observable.

```js
expect(ko.observable(42), 'to be observable');
```

In case of a failing expectation you get the following output:

```js
expect(42, 'to be observable');
```

```output
expected 42 to be observable
```

This assertion can be negated using the not flag:

```js
expect(42, 'not to be observable');
```

In case of a failing expectation you get the following output:

```js
expect(ko.observable(42), 'not to be observable');
```

```output
expected ko.observable(42) not to be observable
```
