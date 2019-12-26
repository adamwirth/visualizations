// GOAL I want to make a code parser
// and then make it animate somehow
// I think I should first write or import a parser/compiler and then figure out how to inject DOM things to make it visual later

// MISC [e]bnf grammar flashbacks
// e.g. <int> := <int>|<int>+<digit> or something

// CMD node ./javascriptCompiler/first.js
const A = require('arcsecond')

// ok now it should create a subsection for each of these. and the .many should nest subsections of whitespace (just the space character)
const stringParser = A.sequenceOf([
    A.letters,
    A.digits,
    A.str('hello'),
    A.many(A.char(' ')),
    A.str('world'),
    A.endOfInput,
])

console.log(
    stringParser.run(
        'asdf1234hello   world'
    )
)
/*
{ isError: false,
  result:
   [ 'asdf', '1234', 'hello', [ ' ', ' ', ' ' ], 'world', null ],
  index: 21,
  data: null }
*/

// cares about order, this wont work
console.log(
    stringParser.run(
        'asdf1234     helloworld '
    )
)

/*
{ isError: true,
error:
"ParseError (position 8): Expecting string 'hello', got '     ...'",
index: 8,
data: null }
*/