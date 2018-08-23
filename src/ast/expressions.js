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

export class LogicExpression extends Expression {
  compile(bytecode) {
    super.compile(bytecode)

    if (this.operator == 'or') {
      bytecode.push('Or')
      return
    }

    if (this.operator == 'and') {
      bytecode.push('And')
      return
    }

    throw new Error(`Unsuported operator: ${this.operator}`)
  }
}

export class CompareExpression extends Expression {

  compile(bytecode) {
    super.compile(bytecode)

    if (this.operator == '==') {
      bytecode.push('IsEq')
      return
    }

    if (this.operator == '!=') {
      bytecode.push('IsEq')
      bytecode.push('Not')
      return
    }

    if (this.operator == '>=') {
      bytecode.push('IsGte')
      return
    }

    if (this.operator == '>') {
      bytecode.push('IsGt')
      return
    }

    if (this.operator == '<') {
      bytecode.push('IsGte')
      bytecode.push('Not')
      return
    }

    if (this.operator == '<=') {
      bytecode.push('IsGt')
      bytecode.push('Not')
      return
    }

    throw new Error(`Unsuported operator: ${this.operator}`)
  }
}

export class UnaryExpression extends Base {
  constructor(expression, operator) {
    super()
    this.expression = expression
    this.operator = operator
  }

  analyze(context) {
    this.expression.analyze(context)
  }

  compile(bytecode) {
    this.expression.compile(bytecode)
    if (this.operator == 'not') {
      bytecode.push('Not')
      return
    }

    if (this.operator == '-') {
      bytecode.push('Push', -1)
      bytecode.push('Mul')
      return
    }
    throw new Error(`Unsuported operator: ${this.operator}`) 
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
