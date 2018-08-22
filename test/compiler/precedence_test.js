import { expect } from 'chai'
import { compile } from '../helpers'

describe('Compiler', function () {
  it('operator precedence', compile('./test/factories/precedence.tank', function(vm, bytecode) {
    expect(vm.frame.get(1)).to.deep.eq(0)
    debugger
    expect(bytecode).to.deep.eq([
      { opcode: 'Push', operands: [0] },// initialize precedenceResult
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [1] },
      { opcode: 'Push', operands: [2] },
      { opcode: 'Push', operands: [3] },
      { opcode: 'Mul' }, // 2 * 3
      { opcode: 'Sub' }, // 1 - 6

      { opcode: 'Push', operands: [5] },
      { opcode: 'Add' }, // 5 - 5

      { opcode: 'Store', operands: [1] }, // store 0
      { opcode: 'Halt' }
    ])
  }))
})
