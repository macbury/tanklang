import { UndefinedVariable, MissingCall, CallStackOverflow } from './errors'

export class Frame {
  variables = {}

  constructor(returnAddress) {
    this.returnAddress = returnAddress
  }

  get(varNumber) {
    if (this.variables[varNumber] == null) {
      throw new UndefinedVariable()
    }
    return this.variables[varNumber]
  }

  set(varNumber, value) {
    this.variables[varNumber] = value
  }
}

const MAX_STACK_SIZE = 200

export class Frames {
  stack = []

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
    this.stack.push(new Frame(returnAddress))
  }

  pop() {
    if (this.length <= 1) {
      throw new MissingCall()
    }
    return this.stack.pop().returnAddress
  }
}