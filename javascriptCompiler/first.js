// GOAL I want to make a code parser
// and then make it animate somehow
// I think I should first write or import a parser/compiler and then figure out how to inject DOM things to make it visual later

// MISC [e]bnf grammar flashbacks
// e.g. <int> := <int>|<int>+<digit> or something

// CMD node ./javascriptCompiler/first.js
const A = require('arcsecond')

const helloWorld = 'hello world'
// only likes this string, however many times now
const stringParser = A.many(A.str(helloWorld))

console.log(stringParser.run(helloWorld + helloWorld + helloWorld))
/*
{ isError: false,
  result: [ 'hello world', 'hello world', 'hello world' ],
  index: 33,
  data: null }
  */