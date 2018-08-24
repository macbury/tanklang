import { Base } from './base'

export class DefGlobalMethod extends Base {
  constructor(methodName, params, block) {
    super()
    this.methodName = methodName
    this.params = params
    this.block = block
    debugger
  }

  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.methodName)
    this.methodUUID = context.addVariable(this.methodName)
    this.params.analyze(context)
    this.block.analyze(context)
  }
}
