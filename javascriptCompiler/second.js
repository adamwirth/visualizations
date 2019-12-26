const A = require('arcsecond')

// ref tutorial https://youtu.be/1axJDmK_pnE?list=PLP29wDx6QmW5yfO1LAgO8kU3aQEj8SIrU

const trailMax = 10 // its like trailmix haha
const trail = s => s.length > trailMax ? `"${s.slice(0, trailMax)}..."` : `"${s}"`

// "curried" function.
// todo why is it called currying anyway...
const str = s => targetString => {
    if (targetString.startsWith(s)) {
        return s
    }

    throw new Error(`Tried to match "${s}", instead got ${trail(targetString)}`)
}

const run = (parser, targetString) => {
    return parser(targetString)
}

const parser = str('hello world!')

run(parser, 'This will not work.')
// throws the error

run(parser, 'hello world! This should work')
// doesn't print anything / works