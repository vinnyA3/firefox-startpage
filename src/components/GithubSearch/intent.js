import { path, compose, not, isEmpty } from 'ramda'

const notEmpty = compose(not, isEmpty)

export default function intent (domSource) {
  const input$ = domSource
    .select('input')
    .events('input')
    .map(path(['target', 'value']))
    .filter(notEmpty)

  return { input$ }
}
