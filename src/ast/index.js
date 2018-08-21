import { Number, Boolean, Type } from './values'
import { DeclareVariable, AssignVariable, VarExp } from './variables'
import { Program, Block, Joiner, Base } from './base'

class BinaryExpression extends Base {
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

export const generateAst = {
  Program: (block) => {
    return new Program(block.toAst())
  },

  Block: (statements, _newLine) => {
    return new Block(statements.toAst())
  },

  Type: (type) => {
    return Type.for(type.sourceString)
  },

  VarExp: (id) => {
    return new VarExp(id.sourceString)
  },

  Exp_binary: (leftExpression, operator, rightExpression) => {
    return new BinaryExpression(leftExpression.toAst(), operator.sourceString, rightExpression.toAst())
  },

  Statement_decl: (_let, varExp, _sep, type) => {
    return new DeclareVariable(varExp.toAst(), type.toAst())
  },

  Statement_declAssign: (_let, varExp, _sep, type, _assigment, value) => {
    let ve = varExp.toAst()
    return new Joiner(
      new DeclareVariable(ve, type.toAst()),
      new AssignVariable(ve, value.toAst())
    )
  },

  number: (number) => {
    return new Number(number.sourceString)
  },

  boolean: (boolean) => {
    return new Boolean(boolean.sourceString)
  }
}

