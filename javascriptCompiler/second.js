// ref tutorial https://youtu.be/1axJDmK_pnE?list=PLP29wDx6QmW5yfO1LAgO8kU3aQEj8SIrU

const trailMax = 10 // its like trailmix haha
const trail = s => s.length > trailMax ? `"${s.slice(0, trailMax)}..."` : `"${s}"`

// utility function. reminder we are aiming for immutability in our system; this should return a NEW object.
const updateParserState = (state, index, result) => ({
    ...state,
    index,
    result,
})

// Don't update index
const updateParserResult = (state, result) => ({
    ...state,
    result,
})

// utility function. add errormsg, now isError
const updateParserError = (state, errorMsg) => ({
    ...state,
    isError: true,
    error: errorMsg,
})

// "curried" function.
// todo why is it called currying anyway...

// receive a parserState object now.
const str = s => parserState => {

    // todo I don't think there's a way to do individual defaults in this context, like "index = 0". I don't want to give it much brain power rn but I rememeber something finicky about that. like the whole object would have to be undefined, not just an attribute of it kinda thing
    const {
        targetString,
        index,
        isError,
     } = parserState

    // return parser error all the way back down/(up?) to the user. this will allow us to catch on to unexpected errors
    if (isError) {
        return parserState
    }

    if (targetString.slice(index).startsWith(s)) {
        return updateParserState(
            parserState, index + s.length, s,
        )
    }

    return updateParserError(
        parserState,
        `Tried to match "${s}", instead got ${trail(targetString)}`,
    )
}

const sequenceOf = parsers => parserState => {
    if (parserState.isError) {
        return parserState
    }

    const results = []
    let nextState = parserState

    for (let p of parsers) {
        nextState = p(nextState)
        results.push(nextState.result)
    }

    return updateParserResult(
        nextState,
        results,
    )
}

// parsers should all be receiving and returning a "Parser State" object
const run = (parser, targetString) => {
    const initialState = {
        targetString,
        index: 0,
        result: null,
        isError: false,
        error: null,
    }

    // need to pass a state object instead now
    return parser(initialState)
}

const parser = str('hello world')

console.log(
    run(parser, 'hello world!')
)
/*
{ targetString: 'hello world!',
  index: 11,
  result: 'hello world',
  isError: false,
  error: null }
*/
