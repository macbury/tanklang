import { UndefinedVariable, MissingCall, CallStackOverflow } from './errors'

export class Frame {
  variables = {}

  constructor(returnAddress, globalFrame) {
    this.returnAddress = returnAddress
    this.globalFrame = globalFrame
  }

  get(varNumber) {
    if (this.variables[varNumber] != null) {
      return this.variables[varNumber]
    } else if (this.globalFrame != null) {
      return this.globalFrame.get(varNumber)
    }
    throw new UndefinedVariable(varNumber)
  }

  set(varNumber, value) {
    this.variables[varNumber] = value
  }
}

const MAX_STACK_SIZE = 200

export class Frames {
  stack = []

  constructor() {
    this.global = new Frame(0)
    this.stack.push(this.global)
  }

  get current() {
    return this.stack[this.length - 1]
  }

  get length() {
    return this.stack.length
  }

  push(returnAddress) {
    if (this.length + 1 >= MAX_STACK_SIZE) {
      throw new CallStackOverflow()
    }
    this.stack.push(new Frame(returnAddress, this.global))
  }

  pop() {
    if (this.length <= 1) {
      throw new MissingCall()
    }
    return this.stack.pop().returnAddress
  }
}
