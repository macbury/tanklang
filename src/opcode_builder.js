import { assert } from './errors'

class Opcode {
  constructor(code, name, expression) {
    this.code = code
    this.name = name
    this.expression = expression
    this.power = 3
  }

  setCharge(power) {
    this.power = power
    return this
  }
}

export default class OpcodesBuilder {
  opcodes = {}
  index = 0
  indexToName = {}

  register(name, expression) {
    this.opcodes[name] = new Opcode(this.index, name, expression)
    this[name] = this.index
    this.indexToName[this.index] = name
    this.index += 1
    return this.opcodes[name]
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
    let instruction = this.opcodes[name]
    vm.charge(instruction.power)
    await instruction.expression(vm)
  }
}
