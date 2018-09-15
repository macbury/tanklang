class Symbol {
  constructor(name, type, id) {
    this.name = name
    this.type = type
    this.id = id
    this.kind = 'variable'
  }

  isMethod() {
    return this.kind == 'method'
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

  symbolMustNotBeAlreadyDeclared(name) {
    if (this.fetchSymbol(name)) {
      throw new Error(`Symbol ${name} already declared`)
    }
  }

  symbolMustBeDeclared(name) {
    if (!this.fetchSymbol(name)) {
      throw new Error(`Symbol ${name} not defined`)
    }
  }

  addSymbol(name, type) {
    this.symbolTable[name] = new Symbol(name, type, this.nextUUID())
    return this.symbolTable[name]
  }

  addMethod(name, returnType) {
    let method = this.addSymbol(name, returnType)
    method.kind = 'method'
    return method
  }

  lookupSymbol(name) {
    const symbol = this.fetchSymbol(name)
    if (symbol) {
      return symbol
    } else if (!this.parent) {
      throw new Error(`Symbol ${name} not found`)
    }
    return this.parent.lookupSymbol(name)
  }

  fetchSymbol(name) {
    let symbol = this.symbolTable[name]
    if (this.parent != null && symbol == null) {
      return this.parent.fetchSymbol(name)
    } else {
      return symbol
    }
  }
}
