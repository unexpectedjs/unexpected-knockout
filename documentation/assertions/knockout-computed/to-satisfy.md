Asserts that a computed value matches a given specification.

For more information see the documentation for
[to satisfy](http://unexpectedjs.github.io/assertions/any/to-satisfy/).

```js
expect(ko.computed(function () {
  return { foo: 'f00!' };
}), 'to satisfy', { foo: 'foo' });
```

```output
expected ko.computed({ foo: 'f00!' }) to satisfy { foo: 'foo' }

ko.computed({
  foo: 'f00!' // should equal 'foo'
              //
              // -f00!
              // +foo
})
```
