import xs from 'xstream'
import { run } from '@cycle/xstream-run'
import { timeDriver } from '@cycle/time'
import { makeDOMDriver } from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'
import { html } from 'snabbdom-jsx'

const githubInfoTemplate = ({ name, blog, location, public_repos }) =>
  <div>
    <h2>{ name }</h2>
    <h3>{ blog }</h3>
    <h3>{ location }</h3>
    <h3>Public Repos: { public_repos }</h3>
  </div>

function main ({ DOM, HTTP, TIME }) {
  const category = 'user'

  const input$ = DOM.select('input').events('input')
    .map(e => e.target.value)
    .startWith('')

  const fetchGihubUser$ = input$
    .filter(val => val !== '')
    .compose(TIME.debounce(600))
    .map(user => ({
      method: 'GET',
      url: `https://api.github.com/users/${user}`,
      category
    }))

  const getResult$ = HTTP.select(category)
    .flatten()
    .map(res => res.body)
    .startWith(null)

  return {
    DOM: view(getResult$),
    HTTP: fetchGihubUser$
  }
}

function view (input$) {
  return input$.map(user =>
    <div>
      <input type='text' />
      <ul>
        { user !== null ? githubInfoTemplate(user) : '' }
      </ul>
    </div>
  )
}

run(main, {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
  TIME: timeDriver
})
