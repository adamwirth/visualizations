// GOAL I want to make a code parser
// and then make it animate somehow
// I think I should first write or import a parser/compiler and then figure out how to inject DOM things to make it visual later

// MISC [e]bnf grammar flashbacks
// e.g. <int> := <int>|<int>+<digit> or something

// CMD node ./javascriptCompiler/first.js
const A = require('arcsecond')

// only likes this string, however many times now
const stringParser = A.many(A.str('hello world'))

console.log(stringParser.run('hello world hello world hello world'))
/*
{ isError: false,
  result: [ 'hello world' ],
  index: 11,
  data: null }
*/