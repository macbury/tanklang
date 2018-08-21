class Variable {
  constructor(name, type, id) {
    this.name = name
    this.type = type
    this.id = id
  }

  cast(value) {
    if (this.type == 'number') {
      return parseInt(value)
    } else if (this.type == 'boolean') {
      return value == 'true' ? 1 : 0
    } else if (this.type == 'string') {
      return value.toString()
    } else {
      throw `Undefined ${this.type} for ${value}`
    }
  }

  defaultValue() {
    if (this.type == 'number') {
      return 0
    } else if (this.type == 'boolean') {
      return 0
    } else if (this.type == 'string') {
      return ''
    } else {
      throw `Undefined ${this.type} for defaultValie`
    }
  }
}

export default class Context {
  constructor(parent) {
    this.parent = parent
    this.symbolTable = Object.create(null)
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
    if (this.symbolTable[name]) {
      throw `Variable ${name} already declared`
    }
  }

  variableMustBeDeclared(name) {
    if (!this.symbolTable[name]) {
      throw `Variable ${name} not defined`
    }
  }

  addVariable(name, type) {
    this.symbolTable[name] = new Variable(name, type, this.nextUUID())
    return this.symbolTable[name]
  }

  lookupVariable(name) {
    const variable = this.symbolTable[name]
    if (variable) {
      return variable
    } else if (!this.parent) {
      throw `Variable ${name} not found`
    }
    return this.parent.lookupVariable(name)
  }
}
