import { expect } from 'chai'
import { compile } from '../helpers'

describe('Compiler', function () {
  it('operator precedence', compile('./test/factories/precedence.tank', function(vm, bytecode) {
    expect(vm.frame.get(1)).to.deep.eq(-2)
    
    expect(bytecode).to.deep.eq([
      { opcode: 'Push', operands: [0] },// initialize precedenceResult
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [1] },
      { opcode: 'Push', operands: [2] },
      { opcode: 'Push', operands: [3] },
      { opcode: 'Mul' }, // 2 * 3
      { opcode: 'Push', operands: [6] },
      { opcode: 'Div' }, // 6 / 6
      { opcode: 'Add' }, // 1 + 1
      { opcode: 'Push', operands: [4] },
      { opcode: 'Sub' }, // 2 - 4

      { opcode: 'Store', operands: [1] }, // store -2
      { opcode: 'Halt' }
    ])
  }))
})
