// GOAL I want to make a code parser
// and then make it animate somehow
// I think I should first write or import a parser/compiler and then figure out how to inject DOM things to make it visual later

// MISC [e]bnf grammar flashbacks
// e.g. <int> := <int>|<int>+<digit> or something

// CMD node ./javascriptCompiler/first.js
const A = require('arcsecond')

const helloWorld = 'hello world'
// only likes this string, however many times now, and now removes case. doesnt seem to ignore case
// TODO curious how this could be refactored to extract functions?
const stringParser = A.many(A.str(helloWorld))
    .map(results =>
        results.map(s => s.toUpperCase()).join(''))


console.log(stringParser.run(
    helloWorld + helloWorld + 'hello WORLD'
))
// TODO misunderstood - the results is being mapped -- not the parsing part
/*
{ isError: false,
  result: 'HELLO WORLDHELLO WORLD',
  index: 22,
  data: null }
  */