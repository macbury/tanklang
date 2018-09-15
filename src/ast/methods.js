import { Base } from './base'
import { Type } from './values'

export class ReturnVoidStatement extends Base {
  compile(bytecode) {
    bytecode.push('Push', 0).setDebugInfo(this.codeLocation)
    bytecode.push('Ret').setDebugInfo(this.codeLocation)
  }
}

export class ReturnStatement extends Base {
  constructor(expression) {
    super()
    this.expression = expression
  }

  analyze(context) {
    this.expression.analyze(context)
  }

  compile(bytecode) {
    this.expression.compile(bytecode)
    bytecode.push('Ret').setDebugInfo(this.codeLocation)
  }
}

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
    bytecode.push('Store', this.id).setDebugInfo(this.codeLocation)
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
    this.methodSymbol = context.addMethod(this.methodName, this.returnType)

    this.params.forEach((param) => param.analyze(context))
    this.returnType.analyze(context)
    this.methodSymbol.argsTypes = this.params.map((param) => param.type)
    this.block.analyze(context)
  }

  compile(bytecode) {
    let labelMethodBody = bytecode.push('Jmp', 0)
    this.methodSymbol.address = bytecode.address
    this.params.forEach((param) => param.compile(bytecode))
    this.block.compile(bytecode)
    bytecode.push('Push', this.returnType.defaultValue).setDebugInfo(this.codeLocation)
    bytecode.push('Ret').setDebugInfo(this.codeLocation)

    labelMethodBody.operands = [bytecode.address]
    labelMethodBody.setDebugInfo(this.codeLocation)
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
    this.methodSymbol = context.addMethod(this.methodName, Type.None)
    this.params.forEach((param) => param.analyze(context))
    this.methodSymbol.argsTypes = this.params.map((param) => param.type)
    this.block.analyze(context)
  }

  compile(bytecode) {
    let labelMethodBody = bytecode.push('Jmp', 0)
    this.methodSymbol.address = bytecode.address
    this.params.forEach((param) => param.compile(bytecode))
    this.block.compile(bytecode)

    bytecode.push('Push', 0).setDebugInfo(this.codeLocation)
    bytecode.push('Ret').setDebugInfo(this.codeLocation)

    labelMethodBody.operands = [bytecode.address]
    labelMethodBody.setDebugInfo(this.codeLocation)
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
    let requiredArgsTypes = this.methodSymbol.argsTypes

    this.args.forEach((arg) => arg.analyze(context))

    this.assert(requiredArgsTypes.length == this.args.length, `Method ${this.methodName} have ${requiredArgsTypes.length} arguments but you passed ${this.args.length}`)
    for (let i = 0; i < requiredArgsTypes.length; i++) {
      let requiredArg = this.args[i]
      let passedArgType = requiredArgsTypes[i]
      this.assert(requiredArg.type.isEq(passedArgType), `Argument number ${i+1} should be ${requiredArg.type.name} but is ${passedArgType.name} for method ${this.methodName}`)
    }
  }

  compile(bytecode) {
    this.args.forEach((arg) => arg.compile(bytecode))
    bytecode.push('Call', this.methodSymbol.address).setDebugInfo(this.codeLocation)
  }

  get type() {
    return this.methodSymbol.type
  }
}

export class RunVoidMethod extends RunMethod {
  compile(bytecode) {
    super.compile(bytecode)
    bytecode.push('Pop').setDebugInfo(this.codeLocation)
  }

  get type() {
    return Type.none
  }
}
