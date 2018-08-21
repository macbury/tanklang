import { Base } from './base'
export class BinaryExpression extends Base {
  constructor(left, operator, right) {
    super()
    this.left = left
    this.right = right
    this.operator = operator
  }

  analyze(context) {
    this.left.analyze(context)
    this.right.analyze(context)
  }

  compile(bytecode) {
    this.left.compile(bytecode)
    this.right.compile(bytecode)

    if (this.operator == '+') {
      bytecode.push('Add')
      return
    }

    if (this.operator == '-') {
      bytecode.push('Sub')
      return
    }
    throw new Error(`Unsuported operator: ${this.operator}`)
  }
}