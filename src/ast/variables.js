import { Base } from './base'
import { Type } from './values'

export class DeclareVariable extends Base {
  constructor(varExp, type) {
    super()
    this.varExp = varExp
    this.type = type
  }

  analyze(context) {
    context.symbolMustNotBeAlreadyDeclared(this.varExp.name)
    context.addSymbol(this.varExp.name, this.type)
    this.varExp.analyze(context)
  }

  compile(bytecode) {
    bytecode.push('Push', this.type.defaultValue).setDebugInfo(this.codeLocation)
    bytecode.push('Store', this.varExp.id).setDebugInfo(this.codeLocation)
  }
}

export class AssignVariable extends Base {
  constructor(varExp, value) {
    super()
    this.varExp = varExp
    this.value = value
  }

  analyze(context) {
    this.varExp.analyze(context)
    this.value.analyze(context)
    
    this.varExp.validateType(this.value)// how to gues value from expression?
  }

  compile(bytecode) {
    this.value.compile(bytecode)
    bytecode.push('Store', this.varExp.id).setDebugInfo(this.codeLocation)
  }
}

export class VarExp extends Base {
  constructor(name) {
    super()
    this.name = name
  }

  analyze(context) {
    context.symbolMustBeDeclared(this.name)
    let { id, type } = context.lookupSymbol(this.name)
    this.id = id
    this.type = type
  }

  validateType(value) {
    this.assert(value.type != null, 'Critical error! No type for value')
    this.assert(
      this.type.isEq(value.type),
      `${this.name} is type of ${this.type.name} but you want assign ${value.type.name}`
    )
  }

  compile(bytecode) {
    bytecode.push('Load', this.id).setDebugInfo(this.codeLocation)
  }
}
