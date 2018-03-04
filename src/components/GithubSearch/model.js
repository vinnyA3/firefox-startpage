import { toUpper } from 'ramda'

export default function model (actions) {
  const { input$ } = actions
  const toUpperCase$ = input$
    .map(toUpper)
    .startWith('')

  return toUpperCase$
}
