Asserts that a observable value matches a given specification.

For more information see the documentation for
[to satisfy](http://unexpectedjs.github.io/assertions/any/to-satisfy/).

```js
expect(ko.observable({ foo: 'f00!' }), 'to satisfy', {
  foo: expect.it('to have length', 3)
});
```

```output
expected ko.observable({ foo: 'f00!' })
to satisfy { foo: expect.it('to have length', 3) }

ko.observable({
  foo: 'f00!' // should have length 3
              //   expected 4 to be 3
})
```
