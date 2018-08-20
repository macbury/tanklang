import Opcodes from './opcodes'
import { ConsoleIO } from './io'
import { Frames } from './frame'
import Stack from './stack'
import { assert } from './errors'

export class VirtualMachine {
  /**
  * Instruction pointer
  */
  _ip = 0
  stack = []
  program = []
  context = {}
  halted = false

  constructor(instructions, opcodes = Opcodes, io = ConsoleIO) {
    this.program = instructions
    this.opcodes = opcodes
    this._ip = 0
    this.stack = new Stack()
    this.frames = new Frames()
    this.frames.push(0)
    this.io = io
  }

  set ip(newIp) {
    assert(typeof(newIp) == 'number', `Address ${newIp} is invalid`)
    assert(newIp < this.program.length, `Address ${newIp} is outside of program`)
    this._ip = newIp
  }

  get ip() {
    return this._ip
  }

  get frame() {
    return this.frames.current
  }

  /**
  * Run program execution until its halted
  */
  run() {
    while(this.step()) {}
  }

  canStep() {
    return !this.halted && this.ip < this.program.length
  }

  /**
  * Step to next instruction
  */
  step() {
    assert(!this.halted, "VM is halted!")

    let nextOpcode = this.next("End of program")
    this.opcodes.execute(nextOpcode, this)
    if (this.canStep()) {
      return true
    } else {
      this.halted = true
      return false
    }
  }

  next(message = "End of program") {
    assert(this.ip < this.program.length, message)
    let nextWord = this.program[this.ip]
    this._ip += 1
    return nextWord
  }
}
