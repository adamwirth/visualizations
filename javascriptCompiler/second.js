// ref tutorial https://youtu.be/1axJDmK_pnE?list=PLP29wDx6QmW5yfO1LAgO8kU3aQEj8SIrU

const trailMax = 10 // its like trailmix haha
const trail = s => s.length > trailMax ? `"${s.slice(0, trailMax)}..."` : `"${s}"`

// "curried" function.
// todo why is it called currying anyway...

// receive a parserState object now.
const str = s => parserState => {

    // todo I don't think there's a way to do individual defaults in this context, like "index = 0". I don't want to give it much brain power rn but I rememeber something finicky about that. like the whole object would have to be undefined, not just an attribute of it kinda thing
    const {
        targetString,
        index,
     } = parserState

    if (targetString.slice(index).startsWith(s)) {
        return {
            ...parserState,
            // NOTE result + index override the parserState's spread
            result: s,
            index: index + s.length,
        }
    }

    return {
        ...parserState,
        error: `Tried to match "${s}", instead got ${trail(targetString)}`,
        isError: true,
    }
}

const sequenceOf = parsers => parserState => {
    const results = []
    let nextState = parserState

    for (let p of parsers) {
        nextState = p(nextState)
        results.push(nextState.result)
    }

    return {
        ...nextState,
        // overrides the spread's result of with the array of result
        result: results,
    }
}

// parsers should all be receiving and returning a "Parser State" object
const run = (parser, targetString) => {
    const initialState = {
        targetString,
        index: 0,
        result: null,
    }

    // need to pass a state object instead now
    return parser(initialState)
}

const parser = str('hello world')

console.log(
    run(parser, 'gyoza')
)
/*
{ targetString: 'gyoza',
  index: 0,
  result: null,
  error: 'Tried to match "hello world", instead got "gyoza"',
  isError: true }
*/
