// GOAL I want to make a code parser
// and then make it animate somehow
// I think I should first write or import a parser/compiler and then figure out how to inject DOM things to make it visual later

// MISC [e]bnf grammar flashbacks
// e.g. <int> := <int>|<int>+<digit> or something

const arcsecond = require('arcsecond')

// only likes this string
const stringParser = arcsecond.str('hello world')

console.log(stringParser.run('hello world'))
// { isError: false, result: 'hello world', index: 11, data: null }

console.log(stringParser.run('hello universe'))
/*
{ isError: true,
  error:
   "ParseError (position 0): Expecting string 'hello world', got 'hello unive...'",
  index: 0,
  data: null }
  */
