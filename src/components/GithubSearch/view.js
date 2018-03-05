import { html } from 'snabbdom-jsx'

export default function view (state$) {
  return state$.map(user =>
    <div>
      <h1>Github User Search</h1>
      <input type='text' placeholder='Search...'/>
      {
        user === null ? ''
          : user.msg ? user.msg
            : <ul>
              <li>{ user.name }</li>
              <li>Location: { user.location }</li>
              <li>Public Repo: { user.public_repos }</li>
            </ul>
      }
    </div>
  )
}
