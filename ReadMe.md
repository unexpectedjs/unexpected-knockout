# Unexpected-knockout

This module extends the
[Unexpected](https://github.com/sunesimonsen/unexpected) assertion
library with integration for [Knockout](http://knockoutjs.org).

```js
expect(ko.observable(42), 'to be equal', ko.observable(42));
expect(ko.observable(42), 'not to equal', ko.observable(24));
expect(ko.observable(42), 'to be observable');
expect(42, 'not to be observable');
expect({
    foo: ko.observable(42),
    bar: ko.observable(42),
    baz: 42
}, 'to have properties', {
    foo: ko.observable(42),
    baz: 42
});
```

[![Build Status](https://travis-ci.org/sunesimonsen/unexpected-knockout.png?branch=master)](https://travis-ci.org/sunesimonsen/unexpected-knockout)

[Run the test in the browser](http://sunesimonsen.github.io/unexpected-knockout/test/tests.html)

## How to use

### Node

Install it with NPM or add it to your `package.json`:

```
$ npm install knockout unexpected unexpected-knockout
```

Then:

```js
var expect = require('unexpected').clone();
expect.installPlugin(require('unexpected-knockout));
```

### Browser

Include the `unexpected.js` found at the lib directory of this
repository.

```html
<!-- Knockout -->
<script src="knockout.js"></script>
<!-- Unexpected -->
<script src="unexpected.js"></script>
<script src="unexpected-knockout.js"></script>
```

this will expose the expect function under the following namespace:

```js
var expect = weknowhow.expect.clone();
expect.installPlugin(weknowhow.unexpectedKnockout);
```

### RequireJS

Include the library with RequireJS the following way:

```js
define(['unexpected', 'unexpected-knockout'], funtion (unexpected, unexpectedKnockout) {
   var expect = unexpected.clone();
   expect.installPlugin(unexpectedKnockout);
   // Your code
});
```

## API

### to equal

Passes if the subject and the argument are observables with equal values.

```js
expect(ko.observable(42), 'to be equal', ko.observable(42));

expect(ko.observable({
    id: '4331241234',
    name: ko.observable('test'),
    age: ko.observable(42)
}), 'to equal', ko.observable({
    id: '4331241234',
    name: ko.observable('test'),
    age: ko.observable(42)
}));
```

### not to equal

Passes if the subject and the argument are observables with values
that are not equals; or if only the subject or the argument is
observable.

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
```

### to be observable

Passes if the subject is a Knockout observable.

```js
expect(ko.observable(42), 'to be observable');
```

### not to be observable

Passes if the subject is not a Knockout observable.

```js
expect(42, 'not to be observable');
```
