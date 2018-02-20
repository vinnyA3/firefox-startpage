import 'main.scss'
import { IO } from 'monet'
import { Future } from 'fluture'
import { curry, compose, head, prop } from 'ramda'

// fetchF :: Future
const fetchF = Future.encaseP(fetch)

// $ :: String -> IO DOM
const $ = selector => new IO(() => document.querySelectorAll(selector))

// == Impure Calling Code ==
fetchF(`https://hacker-news.firebaseio.com/v0/topstories.json`)
    .chain(res => Future.tryP(_ => res.json()))
    .fork(console.error, console.log)
