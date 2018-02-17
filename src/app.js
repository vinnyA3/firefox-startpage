import 'main.scss'
import { IO } from 'monet'
import { curry, compose, head } from 'ramda'

// $ :: String -> IO DOM
const $ = selector => new IO(() => document.querySelectorAll(selector))

// == Impure Calling Code ==
$('.intro-heading')
    .map(head)
    .map(el => el.style.color = 'maroon')
    .run()
