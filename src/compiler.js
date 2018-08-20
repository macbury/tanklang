import ohm from 'ohm-js'
import { readFileSync } from 'fs'

class CompilationError extends Error {
  constructor(match) {
    super(`Could not compile: ${match.message}`)
    this.match = match
  }
}

export default class Compiler {
  constructor() {
    this.grammarSrc = readFileSync('./src/tank.ohm')
    this.grammar = ohm.grammar(this.grammarSrc)
    this.semantic = this.grammar.createSemantics()
    this.createSemantics()
  }

  compile(src) {
    let match = this.grammar.match(src)
    if (match.succeeded()) {
      return this.semantic(match).toAst()
    } else {
      throw new CompilationError(match)
    }
  }

  createSemantics() {
    this.semantic.addOperation('toAst', {
      Program: (e) => {
        return 'test'
      }
    })
  }
}
