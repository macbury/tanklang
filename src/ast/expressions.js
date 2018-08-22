import { Base } from './base'

class Expression extends Base {
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
  }
}

export class AddOpExpression extends Expression {
  compile(bytecode) {
    super.compile(bytecode)

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

export class MulOpExpression extends Expression {
  compile(bytecode) {
    super.compile(bytecode)

    if (this.operator == '*') {
      bytecode.push('Mul')
      return
    }

    if (this.operator == '/') {
      bytecode.push('Div')
      return
    }

    throw new Error(`Unsuported operator: ${this.operator}`)
  }
}
