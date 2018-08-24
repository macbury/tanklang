import { Number, Boolean, Type } from './values'
import { DeclareVariable, AssignVariable, VarExp } from './variables'
import { Program, Block, LocalBlock, Joiner, Base } from './base'
import { AddOpExpression, MulOpExpression, LogicExpression, CompareExpression, UnaryExpression } from './expressions'
import { IfStatement, IfElseStatement } from './logic'
import { WhileStatement, RepeatStatement } from './loop'
import { DefGlobalVoidMethod, Param, RunVoidMethod } from './methods'

export const generateAst = {
  Program: (block) => {
    return new Program(block.toAst())
  },

  GlobalBlock: (statements) => {
    return new Block(statements.toAst())
  },

  LocalBlock: (statements) => {
    return new LocalBlock(statements.toAst())
  },

  CurlBlock: (_lcurl, block, _rcurl) => {
    return block.toAst()
  },

  Type: (type) => {
    return Type.for(type.sourceString)
  },

  VarExp: (id) => {
    return new VarExp(id.toAst())
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

  GlobalStatement_DefVoidMethod: (id, params, block) => {
    return new DefGlobalVoidMethod(id.toAst(), params.toAst(), block.toAst())
  },

  LocalStatement_RunVoidMethod: (id, args, _br) => {
    return new RunVoidMethod(id.toAst(), args.toAst())
  },

  LocalStatement_decl: (_let, varAndType, _br) => {
    let ve = varAndType.toAst()
    return new DeclareVariable(ve, ve.type)
  },

  LocalStatement_declAssign: (_let, varAndType, _assigment, value, _br) => {
    let ve = varAndType.toAst()
    return new Joiner(
      new DeclareVariable(ve, ve.type),
      new AssignVariable(ve, value.toAst())
    )
  },

  LocalStatement_declGuessType: (_let, varExp, _assigment, value, _br) => {
    let ve = varExp.toAst()
    let v = value.toAst()
    return new Joiner(
      new DeclareVariable(ve, v.type),
      new AssignVariable(ve, value.toAst())
    )
  },

  LocalStatement_Assign: (varExp, _assign, exp, _br) => {
    return new AssignVariable(varExp.toAst(), exp.toAst())
  },

  LocalStatement_if: (_if, _lparen, expression, _rparen, block) => {
    return new IfStatement(expression.toAst(), block.toAst())
  },

  LocalStatement_ifElse: (_if, _lparen, expression, _rparen, ifBlock, _else, elseBlock) => {
    return new IfElseStatement(expression.toAst(), ifBlock.toAst(), elseBlock.toAst())
  },

  LocalStatement_While: (_while, _lparen, expression, _rparen, block) => {
    return new WhileStatement(expression.toAst(), block.toAst())
  },

  LocalStatement_Repeat: (_repeat, _lparen, number, _rparen, block) => {
    return new RepeatStatement(number.toAst(), block.toAst())
  },

  VarAndType: (varExp, _sep, type) => {
    let va = varExp.toAst()
    va.type = type.toAst()
    return va
  },

  Args: (_lparen, expressions, _rparen) => {
    return expressions.toAst()
  },

  Params: (_lparen, params, _rparen) => {
    return params.toAst()
  },

  Param: (id, _sep, type) => {
    return new Param(id.toAst(), type.toAst())
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

  id: (op) => {
    return op.sourceString
  },

  prefixop: (op) => {
    return op.sourceString
  },

  compare: (op) => {
    return op.sourceString
  },

  EmptyListOf: () => [],

  NonemptyListOf: function(el, _sep, els) {
    return [el.toAst()].concat(els.toAst())
  }
}

