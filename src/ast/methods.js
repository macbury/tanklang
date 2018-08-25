import { Base } from './base'
import { Type } from './values'

export class Param extends Base {
  constructor(name, type) {
    super()
    this.name = name
    this.type = type
  }

  analyze(context) {
    context.symbolMustNotBeAlreadyDeclared(this.name)
    this.id = context.addSymbol(this.name, this.type).id
  }

  compile(bytecode) {
    bytecode.push('Store', this.id)
  }
}

export class DefGlobalMethod extends Base {
  constructor(methodName, params, returnType, block) {
    super()
    this.methodName = methodName
    this.params = params
    this.returnType = returnType
    this.block = block
  }

  analyze(context) {
    context.symbolMustNotBeAlreadyDeclared(this.methodName)
    this.methodSymbol = context.addSymbol(this.methodName, Type.method)
    this.params.forEach((param) => param.analyze(context))
    this.returnType.analyze(context)
    this.block.analyze(context)
  }

  compile(bytecode) {
    let labelMethodBody = bytecode.push('Jmp', 0)
    this.methodSymbol.address = bytecode.address
    this.params.forEach((param) => param.compile(bytecode))
    this.block.compile(bytecode)

    bytecode.push('Push', this.returnType.defaultValue())
    bytecode.push('Ret')

    labelMethodBody.operands = [bytecode.address]
  }
}

export class DefGlobalVoidMethod extends Base {
  constructor(methodName, params, block) {
    super()
    this.methodName = methodName
    this.params = params
    this.block = block
  }

  analyze(context) {
    context.symbolMustNotBeAlreadyDeclared(this.methodName)
    this.methodSymbol = context.addSymbol(this.methodName, Type.method)
    this.params.forEach((param) => param.analyze(context))
    this.block.analyze(context)
  }

  compile(bytecode) {
    let labelMethodBody = bytecode.push('Jmp', 0)
    this.methodSymbol.address = bytecode.address
    this.params.forEach((param) => param.compile(bytecode))
    this.block.compile(bytecode)

    bytecode.push('Push', 0)
    bytecode.push('Ret')

    labelMethodBody.operands = [bytecode.address]
  }
}

export class RunMethod extends Base {
  constructor(methodName, args) {
    super()
    this.methodName = methodName
    this.args = args
  } 

  analyze(context) {
    context.symbolMustBeDeclared(this.methodName)
    this.methodSymbol = context.lookupSymbol(this.methodName)
    this.args.forEach((arg) => arg.analyze(context))
  }

  compile(bytecode) {
    this.args.forEach((arg) => arg.compile(bytecode))
    bytecode.push('Call', this.methodSymbol.address)
  }
}

export class RunVoidMethod extends RunMethod {
  compile(bytecode) {
    super.compile(bytecode)
    bytecode.push('Pop')
  }
}
