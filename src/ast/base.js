export class Base {
  analyze(context) {
    // first step, prepare variables, loops etc...
  }

  compile(bytecode) {
    // second step done after analyze is complete
    // generete here bytecode
  }
}

export class Program extends Base {
  constructor(block) {
    super()
    this.block = block
  }

  compile(bytecode) {
    this.block.compile(bytecode)
    bytecode.push('Halt')
  }

  analyze(context) {
    this.block.analyze(context)
  }
}

export class Block extends Base {
  constructor(statements) {
    super()
    this.statements = statements
  }

  analyze(context) {
    let blockContext = context.createChildContext()
    this.statements.forEach((statement) => statement.analyze(blockContext))
  }

  compile(bytecode) {
    this.statements.forEach((statement) => statement.compile(bytecode))
  }
}

/**
* Join multiple nodes into one
*/
export class Joiner extends Base {
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
