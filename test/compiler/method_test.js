import { expect } from 'chai'
import { loadAndcompile } from '../helpers'

describe('methods', function () {
  it.only('generating method', loadAndcompile('./test/factories/methods/simple.tank', function(vm, bytecode) {
    expect(vm.frame.get(3)).to.deep.eq(3000)

    expect(bytecode).to.deep.eq([
      { opcode: 'Push', operands: [0] },// initialize a
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [1000] }, // set a to 1000
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [0] },// initialize b
      { opcode: 'Store', operands: [2] }, 

      // jmp after method
      // method body start
      // push argA
      // push argB
      // call method
      
      { opcode: 'Halt' }
    ])
  }))
})
