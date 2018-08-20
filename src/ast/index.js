import Opcodes from '../opcodes'
class Base {
  analyze(context) {
    // first step, prepare variables, loops etc...
  }

  compile(bytecode) {
    // second step done after analyze is complete
    // generete here bytecode
  }
}

class Program extends Base {
  constructor(block) {
    super()
  }
}

class Block extends Base {
  constructor(statements) {
    super()
  }
}

export const generateAst = {
  Program: (block) => {
    return new Program(block.toAst())
  },

  Block: (statements, _) => {
    return new Block() //new Block(statements.toAst())
  }
}

