import Opcodes from '../opcodes'

class Instruction {
  constructor(opcodeName, operands) {
    this.opcodeName = opcodeName
    this._operands = operands
  }

  get operands() {
    return this._operands
  }

  set operands(newOps) {
    if (newOps.length == this._operands.length) {
      this._operands = newOps
    } else {
      throw new Error(`Diffrent number of operands in instruction`)
    }
  }

  get opcode() {
    let op = Opcodes[this.opcodeName]
    if (op == null) {
      throw new Error(`Undefined opcode: ${this.opcodeName}`)
    }
    return op
  }

  get length() {
    return this._operands ? this._operands.length + 1 : 1
  }

  haveOperands() {
    return this._operands != null && this._operands.length > 0
  }

  toJs() {
    if (this.haveOperands()) {
      return { opcode: this.opcodeName, operands: this._operands }
    } else {
      return { opcode: this.opcodeName }
    }
  }

  toBytes(bytes) {
    bytes.push(this.opcode)
    if (this.haveOperands()) {
      for (var j = 0; j < this._operands.length; j++) {
        bytes.push(this.operands[j])
      }
    }
  }
}

export default class Bytecode {
  program = []
  address = 0

  push(opcodeName, ...operands) {
    let instruction = new Instruction(opcodeName, operands)
    this.program.push(instruction)
    this.address += instruction.length
    return instruction
  }

  get nextAddress() {
    return this.address + 1
  }

  get(index) {
    return this.program[index]
  }

  toArray() {
    return this.program.map((instruction) => instruction.toJs())
  }

  toBlob() {
    throw "Implement generation of blob"
  }

  toProgram() {
    let code = []
    for (var i = 0; i < this.program.length; i++) {
      this.program[i].toBytes(code)
    }
    return code
  }
}
