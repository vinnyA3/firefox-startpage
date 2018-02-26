import { periodic } from 'most'
import run from '@cycle/most-run'
import { makeDOMDriver } from '@cycle/dom'
import { html } from 'snabbdom-jsx'

function main () {
  const timer$ = periodic(1000)
    .scan((x, y) => x + 1, 0) /* eslint-disable-line */

  const vdom$ = timer$.map(count =>
    <div className='container'>
      <h1 className='heading'>Counter: {count}</h1>
    </div>
  )

  return { DOM: vdom$ }
}

run(main, { DOM: makeDOMDriver('#app') })
