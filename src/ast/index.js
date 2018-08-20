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
    this.block = block
  }

  compile(bytecode) {
    this.block.compile(bytecode)
    bytecode.push(Opcodes.Halt)
  }
}

class Block extends Base {
  constructor(statements) {
    super()
    this.statements = statements
  }

  compile(bytecode) {
    this.statements.forEach((statement) => statement.compile(bytecode))
  }
}

/**
* Join multiple nodes into one
*/
class Joiner extends Base {
  constructor(...nodes) {
    super()
    this.nodes = nodes
  }

  analyze() {
    this.nodes.forEach((node) => node.analyze())
  }

  compile(bytecode) {
    this.nodes.forEach((node) => node.compile(bytecode))
  }
}

class DeclareVariable extends Base {
  constructor(name, type) {
    super()
    this.name = name
    this.type = type
  }
}

class AssignVariable extends Base {
  constructor(name, value) {
    super()
    this.name = name
    this.value = value
  }

  compile(bytecode) {
    bytecode.push(Opcodes.Push, this.value)
    bytecode.push(Opcodes.Store, 0)
  }
}

export const generateAst = {
  Program: (block) => {
    return new Program(block.toAst())
  },

  Block: (statements, _newLine) => {
    return new Block(statements.toAst())
  },

  Statement_declAssign: (_let, id, _sep, type, _assigment, value) => {
    return new Joiner(
      new DeclareVariable(id.sourceString, type.sourceString),
      new AssignVariable(id.sourceString, value.sourceString)
    )
  }
}

