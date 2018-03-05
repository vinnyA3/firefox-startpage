import { throwError } from 'most'
import { identity } from 'ramda'

const requestMap = username => ({
  method: 'GET',
  url: `https://api.github.com/users/${username}`,
  category: 'user-data'
})

export default function model (actions, HTTPSource) {
  const { input$ } = actions
  const getGithubUserData$ = input$
    .debounce(850)
    .map(requestMap)

  const userData$ = HTTPSource
    .select('user-data')
    .chain(identity)
    .map(res => res.body)
    .recoverWith(e => throwError({ msg: 'User not found', e }))
    .startWith(null)

  return { getGithubUserData$, userData$ }
}
