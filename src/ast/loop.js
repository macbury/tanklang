import { Base } from './base'

export class WhileStatement extends Base {
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
    let conditionLabel = bytecode.push('Jmp', 0)
    let loopBeginAddress = bytecode.address

    this.block.compile(bytecode)

    conditionLabel.operands = [bytecode.address]
    this.expression.compile(bytecode)
    bytecode.push('Jif', loopBeginAddress)
  }
}
