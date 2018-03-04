import { html } from 'snabbdom-jsx'

export default function view (state$) {
  return state$.map(word =>
    <div>
      <input type='text' />
      <h2>{ word }</h2>
      <ul>
        <li>(Github username)</li>
        <li>(Github location)</li>
        <li>(Github public_repos)</li>
      </ul>
    </div>
  )
}
