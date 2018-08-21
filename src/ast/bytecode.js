import Opcodes from '../opcodes'

export default class Bytecode {
  program = []

  push(opcodeName, ...operands) {
    if (operands == null || operands.length == 0) {
      this.program.push({ opcode: opcodeName })
    } else {
      this.program.push({ opcode: opcodeName, operands })
    }
  }

  get(index) {
    return this.program[index]
  }

  toArray() {
    return this.program.slice()
  }

  toBlob() {
    throw "Implement generation of blob"
  }

  toProgram() {
    let code = []
    for (var i = 0; i < this.program.length; i++) {
      let { opcode, operands } = this.program[i]
      code.push(Opcodes[opcode])
      if (operands != null) {
        for (var j = 0; j < operands.length; j++) {
          code.push(operands[j])
        }
      }
    }
    return code
  }
}
