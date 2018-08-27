import { assert } from './errors'

export default class OpcodesBuilder {
  expressions = {}
  index = 0
  indexToName = {}

  register(name, expression) {
    this.expressions[name] = expression
    this[name] = this.index
    this.indexToName[this.index] = name
    this.index += 1
  }

  /**
  * Resolve instruction name
  * @param {Integer} opcode 
  * @return {String} instruction name
  */
  resolve(opcode) {
    let name = this.indexToName[opcode]
    assert(name != null, `Unknown opcode: ${opcode}`)
    return name
  }

  async execute(opcode, vm) {
    let name = this.resolve(opcode)
    await this.expressions[name](vm)
  }
}
