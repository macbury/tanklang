import { Base } from './base'
import { Type } from './values'

export class DeclareVariable extends Base {
  constructor(varExp, type) {
    super()
    this.varExp = varExp
    this.type = type
  }

  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.varExp.name)
    context.addVariable(this.varExp.name, this.type)
    this.varExp.analyze(context)
  }

  compile(bytecode) {
    bytecode.push('Push', this.type.defaultValue)
    bytecode.push('Store', this.varExp.id)
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
    this.varExp.validateType(this.value)
  }

  compile(bytecode) {
    this.value.compile(bytecode)
    bytecode.push('Store', this.varExp.id)
  }
}

export class VarExp extends Base {
  constructor(name) {
    super()
    this.name = name
  }

  analyze(context) {
    context.variableMustBeDeclared(this.name)
    let { id, type } = context.lookupVariable(this.name)
    this.id = id
    this.type = type
  }

  validateType(value) {
    if (this.type != value.type) {
      throw `${this.name} is type of ${this.type} but you want assign ${value.type}`
    }
  }

  compile(bytecode) {
    bytecode.push('Load', this.id)
  }
}
