import { Base } from './base'

export class IfStatement extends Base {
  constructor(expression, block) {
    super()
    this.expression = expression
    this.block = block
  }

  analyze(context) {
    this.expression.analyze(context)
    this.block.analyze(context)
  }

  compile(bytecode) {
    this.expression.compile(bytecode)
    bytecode.push('Not')
    let ifLabel = bytecode.push('Jif', 0)
    this.block.compile(bytecode)
    ifLabel.operands = [bytecode.address]
  }
}
