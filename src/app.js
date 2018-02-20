import 'main.scss'

import { IO } from 'monet'
import { take } from 'ramda'
import Future from 'fluture'

const futureFetch = Future.encaseP(fetch)

const safeToJSON = data => Future.tryP(() => data.json()) 

const getStoryData = ids =>
    Future.parallel(5, ids.map(id =>
        futureFetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .chain(safeToJSON)))

const getTopStoriesIds =
    futureFetch('https://hacker-news.firebaseio.com/v0/topstories.json') 
        .chain(safeToJSON)
        .map(take(10))

getTopStoriesIds
    .chain(getStoryData)
    .fork(console.error, console.log)
