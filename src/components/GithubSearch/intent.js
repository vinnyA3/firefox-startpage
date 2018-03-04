import { path } from 'ramda'

export default function intent (domSource) {
  const input$ = domSource
    .select('input')
    .events('input')
    .map(path(['target', 'value']))

  return { input$ }
}
