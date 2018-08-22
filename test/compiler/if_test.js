import { expect } from 'chai'
import { loadAndcompile } from '../helpers'

describe('if', function () {
  it('condition is meet, evaluate block', loadAndcompile('./test/factories/if.tank', function(vm, bytecode) {
    
    expect(vm.frame.get(1)).to.deep.eq(0)
    expect(bytecode).to.deep.eq([
      { opcode: 'Push', operands: [1] },// initialize exp
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [1] }, // load exp to stack
      { opcode: 'Not' }, // negate true to false
      { opcode: 'JmpIf', operands: [11] }, // jump to ignore if block
      
      { opcode: 'Push', operands: [0] },// set exp to false
      { opcode: 'Store', operands: [0] }, // store false
      { opcode: 'Halt' }
    ])
  }))
})
