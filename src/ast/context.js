class Variable {
  constructor(name, type, id) {
    this.name = name
    this.type = type
    this.id = id
  }
}

export default class Context {
  constructor(parent) {
    this.parent = parent
    this.symbolTable = {}
    this.uuid = 0
  }

  nextUUID() {
    if (this.parent == null) {
      this.uuid++
      return this.uuid
    } else {
      return this.parent.nextUUID()
    }
  }

  createChildContext() {
    return new Context(this)
  }

  variableMustNotBeAlreadyDeclared(name) {
    if (this.fetchVariable(name)) {
      throw `Variable ${name} already declared`
    }
  }

  variableMustBeDeclared(name) {
    if (!this.fetchVariable(name)) {
      throw `Variable ${name} not defined`
    }
  }

  addVariable(name, type) {
    this.symbolTable[name] = new Variable(name, type, this.nextUUID())
    return this.symbolTable[name]
  }

  lookupVariable(name) {
    const variable = this.fetchVariable(name)
    if (variable) {
      return variable
    } else if (!this.parent) {
      throw `Variable ${name} not found`
    }
    return this.parent.lookupVariable(name)
  }

  fetchVariable(name) {
    let variable = this.symbolTable[name]
    if (this.parent != null && variable == null) {
      return this.parent.fetchVariable(name)
    } else {
      return variable
    }
  }
}
