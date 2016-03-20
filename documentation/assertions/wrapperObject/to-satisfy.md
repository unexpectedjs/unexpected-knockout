As the types for knockout observables and computeds both inherit from
wrapperObject they support
[to satisfy](http://unexpectedjs.github.io/assertions/any/to-satisfy/)
on the content of the observables:

```js
expect(ko.observable({
    id: '4331241234',
    name: ko.observable('test'),
    age: ko.observable(42)
}), 'to satisfy', {
    id: '4331241234',
    name: 'test',
    age: 42
});
```

In case of a failing expectation you get the following output:

```js
expect(ko.observable({
    id: '4331241234',
    name: ko.observable('test'),
    age: ko.observable(42),
}), 'to satisfy', {
    id: '4331241234',
    name: 'hest',
    age: 41
});
```

```output
expected ko.observable({ id: '4331241234', name: ko.observable('test'), age: ko.observable(42) })
to satisfy { id: '4331241234', name: 'hest', age: 41 }

ko.observable({
  id: '4331241234',
  name: ko.observable('test'), // should equal 'hest'
                               //
                               // -test
                               // +hest
  age: ko.observable(42) // should equal 41
})
```
