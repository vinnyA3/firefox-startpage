import { makeDOMDriver } from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'
import { run } from '@cycle/most-run'

import GithubSearch from 'components/GithubSearch'

run(GithubSearch, {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver()
})
