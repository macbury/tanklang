import { Base } from './base'

export class MessageMethod extends Base {
  constructor(expression) {
    super()
    this.expression = expression
  }

  analyze(context) {
    this.expression.analyze(context)
  }

  compile(bytecode) {
    this.expression.compile(bytecode)
    bytecode.push('Print').setDebugInfo(this.codeLocation)
  }
}
