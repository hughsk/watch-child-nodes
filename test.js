import test from 'tape'
import watch from './'

test('enter/exit', t => {
  const el = document.createElement('div')
  const child = document.createElement('div')

  t.plan(2)

  watch(el,
    enter => t.equal(enter, child),
    exit => t.equal(exit, child)
  )

  el.appendChild(child)
  el.removeChild(child)
})

test('calls enter on existing nodes', t => {
  const el = document.createElement('div')
  const count = 10

  for (var i = 0; i < count; i++) {
    el.appendChild(document.createElement('div'))
  }

  t.plan(10)
  watch(el, enter => t.ok(enter, 'called enter'))
})

test('unobserves with returned function', t => {
  const el = document.createElement('div')
  const dispose = watch(el, enter => count++)
  var count = 0

  el.appendChild(document.createElement('div'))
  el.appendChild(document.createElement('div'))

  setTimeout(_ => {
    t.equal(count, 2, 'called enter in first two cases')
    dispose()
    el.appendChild(document.createElement('div'))
    el.appendChild(document.createElement('div'))
    el.appendChild(document.createElement('div'))

    setTimeout(_ => {
      t.equal(count, 2, 'did not call again after being disposed')
      t.end()
    })
  })
})

test('teardown', t => {
  t.end()
  window.close()
})
