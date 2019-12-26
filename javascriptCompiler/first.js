// GOAL I want to make a code parser
// and then make it animate somehow
// I think I should first write or import a parser/compiler and then figure out how to inject DOM things to make it visual later

// MISC [e]bnf grammar flashbacks
// e.g. <int> := <int>|<int>+<digit> or something

// CMD node ./javascriptCompiler/first.js
const A = require('arcsecond')

// name our things as some type
const tag = type => value => ({ type, value })

const stringParser = A.sequenceOf([

    A.sequenceOf([
        A.letters,
        A.digits
    ]).map(tag('letterOrDigits')),

    A.str('hello').map(tag('string')),
    A.many(A.char(' ')).map(tag('whitespace')),
    A.str('world').map(tag('string')),
    A.endOfInput.map(tag('endOfInput')),
])

console.log(
    stringParser.run(
        'asdf1234hello   world'
    )
)
/*
{ isError: false,
  result:
   [ { type: 'letterOrDigits', value: [Array] },
     { type: 'string', value: 'hello' },
     { type: 'whitespace', value: [Array] },
     { type: 'string', value: 'world' },
     { type: 'endOfInput', value: null } ],
  index: 21,
  data: null }
*/