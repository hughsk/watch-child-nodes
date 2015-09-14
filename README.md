# watch-child-nodes

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Watch the child list of a DOM node, calling a function for each new element and each element removed.

Useful for adding implicit characteristics to the children of a DOM node, without having to worry about any new elements being added/removed as time goes on.

## Usage

[![NPM](https://nodei.co/npm/watch-child-nodes.png)](https://www.npmjs.com/package/watch-child-nodes)

### `dispose = watch(element, enter, exit)`

Watches a DOM `element`'s child list for additions and removals.

`enter` is called once for *each existing child node* and once for *each new node*.

`exit` is called once for *each node removed*.

``` javascript
const watch = require('watch-child-nodes')

watch(parent, function enter (node) {
  console.log('new node!', node)
}, function exit (node) {
  console.log('old node!', node)
})
```

The `dispose` function returned from `watch` can be used to disable the watcher, preventing any future calls of `enter` or `exit`.

``` javascript
const watch = require('watch-child-nodes')

const dispose = watch(parent, enter, exit)

// stop watching for changes after the
// first second:
setTimeout(function () {
  dispose()
}, 1000)
```

## License

MIT, see [LICENSE.md](http://github.com/hughsk/watch-child-nodes/blob/master/LICENSE.md) for details.
