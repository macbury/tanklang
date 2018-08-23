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

export class RepeatStatement extends Base {
  constructor(times, block) {
    super()
    this.times = times
    this.block = block
  }

  analyze(context) {
    this.block.analyze(context)
    this.incVarUUID = context.nextUUID()
  }

  compile(bytecode) {
    bytecode.push('Push', this.times.get())
    bytecode.push('Store', this.incVarUUID)

    let conditionLabel = bytecode.push('Jmp', 0)
    let loopBeginAddress = bytecode.address

    this.block.compile(bytecode)

    conditionLabel.operands = [bytecode.address]
    
    bytecode.push('Load', this.incVarUUID)
    bytecode.push('Push', 1)
    bytecode.push('Sub')
    bytecode.push('Store', this.incVarUUID)

    bytecode.push('Load', this.incVarUUID)
    bytecode.push('Push', 0)
    bytecode.push('IsGte')
    
    bytecode.push('Jif', loopBeginAddress)
  }
}
