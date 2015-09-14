var noop = require('noop2')

module.exports = watchChildNodes

function watchChildNodes (container, enter, exit) {
  enter = enter || noop
  exit = exit || noop

  var observer = new MutationObserver(function (changes) {
    for (var i = 0; i < changes.length; i++) {
      if (changes[i].type !== 'childList') continue
      var add = changes[i].addedNodes
      var rem = changes[i].removedNodes

      for (var a = 0; a < add.length; a++) {
        enter(add[a])
      }

      for (var r = 0; r < rem.length; r++) {
        exit(rem[r])
      }
    }
  })

  var children = container.childNodes
  for (var i = 0; i < children.length; i++) {
    enter(children[i])
  }

  observer.observe(container, {
    childList: true
  })

  return function () {
    if (!observer) return
    observer.disconnect()
    observer = null
  }
}
