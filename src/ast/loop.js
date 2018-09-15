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
    conditionLabel.setDebugInfo(this.codeLocation)

    this.block.compile(bytecode)

    conditionLabel.operands = [bytecode.address]
    this.expression.compile(bytecode)
    bytecode.push('Jif', loopBeginAddress).setDebugInfo(this.codeLocation)
  }
}

export class LoopStatement extends Base {
  constructor(block) {
    super()
    this.block = block
  }

  analyze(context) {
    this.block.analyze(context)
  }

  compile(bytecode) {
    let loopBeginAddress = bytecode.address
    this.block.compile(bytecode)
    bytecode.push('Jmp', loopBeginAddress).setDebugInfo(this.codeLocation)
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
    conditionLabel.setDebugInfo(this.codeLocation)
    
    bytecode.push('Load', this.incVarUUID).setDebugInfo(this.codeLocation)
    bytecode.push('Push', 1).setDebugInfo(this.codeLocation)
    bytecode.push('Sub').setDebugInfo(this.codeLocation)
    bytecode.push('Store', this.incVarUUID).setDebugInfo(this.codeLocation)

    bytecode.push('Load', this.incVarUUID).setDebugInfo(this.codeLocation)
    bytecode.push('Push', 0).setDebugInfo(this.codeLocation)
    bytecode.push('IsGte').setDebugInfo(this.codeLocation)
    
    bytecode.push('Jif', loopBeginAddress).setDebugInfo(this.codeLocation)
  }
}
