---
template: default.ejs
theme: dark
title: unexpected-knockout
repository: https://github.com/unexpectedjs/unexpected-knockout
---

# Unexpected-knockout

![Slam!](images/knockout1.jpg 'Slam!')
![Boom!](images/knockout2.jpg 'Boom!')
![Bang!](images/knockout3.jpg 'Bang!')

This module extends the
[Unexpected](https://github.com/unexpectedjs/unexpected) assertion
library with integration for [Knockout](http://knockoutjs.org).

```js
expect(ko.observable(42), 'to equal', ko.observable(42));
expect(ko.observable(42), 'not to equal', ko.observable(24));
expect(ko.observable(42), 'to be observable');
expect(42, 'not to be observable');
expect(ko.observable(42), 'not to be computed');
expect(
  ko.computed(function () {
    return 42;
  }),
  'to be computed'
);
expect(
  {
    foo: ko.observable(42),
    bar: ko.observable(42),
    baz: 42,
    qux: ko.computed(function () {
      return 42;
    }),
  },
  'to have properties',
  {
    foo: ko.observable(42),
    baz: 42,
    qux: ko.computed(function () {
      return 42;
    }),
  }
);
```

[![Build Status](https://travis-ci.org/unexpectedjs/unexpected-knockout.svg)](https://travis-ci.org/unexpectedjs/unexpected-knockout)

## How to use

### Node

Install it with NPM or add it to your `package.json`:

```
$ npm install knockout unexpected unexpected-knockout
```

Then:

```js#evaluate:false
var expect = require('unexpected').clone();
expect.installPlugin(require('unexpected-knockout'));
```

### Browser

Include the `unexpected-knockout.js` found at the lib directory of this
repository after unexpected itself:

```html
<!-- Knockout -->
<script src="knockout.js"></script>
<!-- Unexpected -->
<script src="unexpected.js"></script>
<script src="unexpected-knockout.js"></script>
```

this will expose the expect function under the following namespace:

```js#evaluate:false
var expect = weknowhow.expect.clone();
expect.installPlugin(weknowhow.unexpectedKnockout);
```

### RequireJS

Include the library with RequireJS the following way:

```js#evaluate:false
define(['unexpected', 'unexpected-knockout'], funtion (unexpected, unexpectedKnockout) {
   var expect = unexpected.clone();
   expect.installPlugin(unexpectedKnockout);
   // Your code
});
```

## Releases

[Changelog](https://github.com/unexpectedjs/unexpected-knockout/blob/master/CHANGELOG.md)
