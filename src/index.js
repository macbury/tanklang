import ohm from 'ohm-js'

let grammar = ohm.grammar('MyGrammar { greeting = "Hello" | "Hola" }')

let sem = grammar.createSemantics().addOperation('ast', {
  greeting: (a) => {
    debugger
    return a
  }
})

let match = grammar.match('Hello')
sem(match).ast()
