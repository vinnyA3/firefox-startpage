import intent from './intent'
import model from './model'
import view from './view'

export default function main (sources) {
  const actions = intent(sources.DOM)
  const state$ = model(actions, sources.HTTP)
  const { userData$ } = state$ // destruct userData stream
  const vdom$ = view(userData$)

  return {
    DOM: vdom$,
    HTTP: state$.getGithubUserData$
  }
}
