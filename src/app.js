import 'main.scss'
// import { IO } from 'monet'
import { take } from 'ramda'
import Future from 'fluture'

// futureFetch :: Future Promise
const futureFetch = Future.encaseP(fetch)

// safeParseJSON :: Object -> Future Rejected JSON
const safeParseJSON = data => Future.tryP(() => data.json()) 

// getStoryData :: Array -> Future Array
const getStoryData = ids =>
    Future.parallel(5, ids.map(id =>
        futureFetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .chain(safeParseJSON)))

// getTopStoriesIds :: Future
const getTopStoriesIds =
    futureFetch('https://hacker-news.firebaseio.com/v0/topstories.json') 
        .chain(safeParseJSON)
        .map(take(10))

// calling all stories ...
getTopStoriesIds
    .chain(getStoryData)
    .fork(console.error, console.log)
