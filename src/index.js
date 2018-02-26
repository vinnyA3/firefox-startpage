import xs from 'xstream'
import { run } from '@cycle/xstream-run'
import { makeDOMDriver } from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'
import { html } from 'snabbdom-jsx'

function main (sources) {
  const getRandomUser$ = sources.DOM.select('.get-random').events('click')
    .map(() => {
      const randomNum = Math.round(Math.random() * 9) + 1
      return {
        url: 'https://jsonplaceholder.typicode.com/users/' + String(randomNum),
        category: 'users',
        method: 'GET'
      }
    })

  const user$ = sources.HTTP.select('users')
    .flatten()
    .map(res => res.body)
    .startWith(null)

  const vdom$ = user$.map(user =>
    <div className='users'>
      <button className='get-random'>Get random user</button>
      { user === null ? null
        : <div className='user-details'>
          <h1 className='user-name'>{ user.name }</h1>
          <h4 className='user-email'>{ user.email }</h4>
        </div>
      }
    </div>
  )

  return {
    DOM: vdom$,
    HTTP: getRandomUser$
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
})
