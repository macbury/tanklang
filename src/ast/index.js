import { Number, Boolean, Type } from './values'
import { DeclareVariable, AssignVariable, VarExp } from './variables'
import { Program, Block, Joiner, Base } from './base'
import { AddOpExpression, MulOpExpression, LogicExpression, CompareExpression, UnaryExpression } from './expressions'
import { IfStatement } from './logic'

export const generateAst = {
  Program: (block) => {
    return new Program(block.toAst())
  },

  Block: (statements) => {
    return new Block(statements.toAst())
  },

  CurlBlock: (_lcurl, block, _rcurl) => {
    return block.toAst()
  },

  Type: (type) => {
    return Type.for(type.sourceString)
  },

  VarExp: (id) => {
    return new VarExp(id.sourceString)
  },

  Exp_or: (leftExpression, _, rightExpression) => {
    return new LogicExpression(leftExpression.toAst(), 'or', rightExpression.toAst())
  },

  Exp1_and: (leftExpression, _, rightExpression) => {
    return new LogicExpression(leftExpression.toAst(), 'and', rightExpression.toAst())
  },

  Exp2_compare: (leftExpression, operator, rightExpression) => {
    return new CompareExpression(leftExpression.toAst(), operator.toAst(), rightExpression.toAst())
  },

  Exp3_add: (leftExpression, operator, rightExpression) => {
    return new AddOpExpression(leftExpression.toAst(), operator.toAst(), rightExpression.toAst())
  },

  Exp4_mul: (leftExpression, operator, rightExpression) => {
    return new MulOpExpression(leftExpression.toAst(), operator.toAst(), rightExpression.toAst())
  },

  Exp5_unary: (operator, expression) => {
    return new UnaryExpression(expression.toAst(), operator.toAst())
  },

  OtherExp_parens: (_left, expression, _right) => {
    return expression.toAst()
  },

  Statement_decl: (_let, varExp, _sep, type, _br) => {
    return new DeclareVariable(varExp.toAst(), type.toAst())
  },

  Statement_declAssign: (_let, varExp, _sep, type, _assigment, value, _br) => {
    let ve = varExp.toAst()
    return new Joiner(
      new DeclareVariable(ve, type.toAst()),
      new AssignVariable(ve, value.toAst())
    )
  },

  Statement_Assign: (varExp, _assign, exp, _br) => {
    return new AssignVariable(varExp.toAst(), exp.toAst())
  },

  Statement_if: (_if, _lparen, expression, _rparen, block) => {
    return new IfStatement(expression.toAst(), block.toAst())
  },

  number: (number) => {
    return new Number(number.sourceString)
  },

  boolean: (boolean) => {
    return new Boolean(boolean.sourceString)
  },

  addop: (op) => {
    return op.sourceString
  },

  mulop: (op) => {
    return op.sourceString
  },

  prefixop: (op) => {
    return op.sourceString
  },

  compare: (op) => {
    return op.sourceString
  },
}

