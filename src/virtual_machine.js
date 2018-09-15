import Opcodes from './opcodes'
import { ConsoleIO } from './io'
import { Frames } from './frame'
import Stack from './stack'
import { assert, OutOfPower } from './errors'
import Random from './random'

export class VirtualMachine {
  /**
  * Instruction pointer
  */
  _ip = 0
  stack = []
  program = []
  context = {}
  halted = false

  constructor(instructions, voltage = 3000000, opcodes = Opcodes) {
    this.program = instructions
    this.opcodes = opcodes
    this._ip = 0
    this.voltage = voltage
    this.stack = new Stack()
    this.frames = new Frames()
    this.io = new ConsoleIO()
    this.random = new Random()
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
  async run() {
    while(await this.step()) {}
  }

  canStep() {
    return !this.halted && this.ip < this.program.length
  }

  /**
  * Each instruction takes some amount of voltage
  */
  charge(voltage) {
    let nextVoltage = this.voltage - voltage
    if (nextVoltage > 0) {
      this.voltage -= voltage
      return
    }
    
    throw new OutOfPower()
  }

  /**
  * Step to next instruction
  */
  async step() {
    assert(!this.halted, "VM is halted!")

    let nextOpcode = this.next("End of program")
    await this.opcodes.execute(nextOpcode, this)
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
