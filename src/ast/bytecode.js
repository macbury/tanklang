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
}
