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

  analyze(context) {
    this.block.analyze(context)
  }
}

class Block extends Base {
  constructor(statements) {
    super()
    this.statements = statements
  }

  analyze(context) {
    this.statements.forEach((statement) => statement.analyze(context))
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

  analyze(context) {
    this.nodes.forEach((node) => node.analyze(context))
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

  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.name)
    context.addVariable(this.name, this.type)
  }
}

class AssignVariable extends Base {
  constructor(name, value) {
    super()
    this.name = name
    this.value = value
  }

  analyze(context) {
    context.variableMustBeDeclared(this.name)
    this.variable = context.lookupVariable(this.name)
  }

  compile(bytecode) {
    bytecode.push(Opcodes.Push, this.variable.cast(this.value))
    bytecode.push(Opcodes.Store, this.variable.id)
  }
}

export const generateAst = {
  Program: (block) => {
    return new Program(block.toAst())
  },

  Block: (statements, _newLine) => {
    return new Block(statements.toAst())
  },

  Statement_decl: (_let, varExp, _sep, type) => {
    return new DeclareVariable(varExp.sourceString, type.sourceString)
  },

  Statement_declAssign: (_let, varExp, _sep, type, _assigment, value) => {
    return new Joiner(
      new DeclareVariable(varExp.sourceString, type.sourceString),
      new AssignVariable(varExp.sourceString, value.sourceString)
    )
  },
}

