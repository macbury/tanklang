import { expect } from 'chai'
import { loadAndcompile } from '../helpers'

describe.only('return', function () {
  it('allows to return value to assigned variable', loadAndcompile('./test/factories/methods/return.tank', function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(1000)
    expect(bytecode).to.deep.eq([
      { opcode: 'Push', operands: [0] }, // initialize hello variable
      { opcode: 'Store', operands: [1] },

      { opcode: 'Jmp', operands: [9] }, // dont run method,
    ])
  }))
})
