import { Base } from './base'

class Value extends Base {
  constructor(type, value) {
    super()
    this.content = value
    this.type = type
  }

  get() {
    return this.content
  }

  compile(bytecode) {
    bytecode.push('Push', this.content)
  }
}

export class Number extends Value {
  constructor(value) {
    super(Type.number, parseInt(value))
  }
}

export class Boolean extends Value {
  constructor(value) {
    super(Type.boolean, value == 'true' ? 1 : 0)
  }
}

class TypeDef extends Base {
  constructor(defaultValue, builder) {
    super()
    this._defaultValue = defaultValue
    this.builder = builder
  }

  get defaultValue() {
    return this._defaultValue
  }

  isEq(otherType) {
    return (this != otherType)
  }
}

const Type = {
  number: new TypeDef(0, Number),
  boolean: new TypeDef(0, Boolean),
  method: new TypeDef(0, null),

  for: (name) => {
    if (Type[name] == null) {
      throw new Error(`Undefined type: ${name}`)
    }
    return Type[name]
  }
}

export { Type }
