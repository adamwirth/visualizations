const A = require('arcsecond')

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

    throw new Error(`Tried to match "${s}", instead got ${trail(targetString)}`)
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

const parser = str('hello world!')

console.log(
    run(parser, 'hello world! This should work')
)
/*
{ targetString: 'hello world! This should work',
  index: 12,
  result: 'hello world!' }
*/
