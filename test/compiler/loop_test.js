import { expect } from 'chai'
import { expectToRaiseOutOfPowerError } from '../helpers'

describe('loop', function () {
  it('increase value and throw OutOfPower', expectToRaiseOutOfPowerError('let a = 0; loop { a = a+1; }', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(52)
    expect(bytecode).to.deep.eq([
      { opcode: 'Push', operands: [0] },// initialize a | 1
      { opcode: 'Store', operands: [1] }, // | 3

      { opcode: 'Push', operands: [0] }, // set a to 0 | 5
      { opcode: 'Store', operands: [1] }, // | 7

      { opcode: 'Load', operands: [1] },
      { opcode: 'Push', operands: [1] },
      { opcode: 'Add' },
      { opcode: 'Store', operands: [1] },
      { opcode: 'Jmp', operands: [8] },
      
      { opcode: 'Halt' } // | 25
    ])
  }))
})
