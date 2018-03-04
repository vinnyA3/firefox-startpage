import intent from './intent'
import model from './model'
import view from './view'

export default function main (sources) {
  const actions = intent(sources.DOM)
  const state$ = model(actions)
  const vdom$ = view(state$)

  return {
    DOM: vdom$
  }
}
