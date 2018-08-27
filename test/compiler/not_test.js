import { expect } from 'chai'
import { compile, loadAndcompile } from '../helpers'

describe('not', function () {
  it('a = not true', compile('let a : boolean = not true;', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.deep.eq(0)
    
    expect(bytecode).to.deep.eq([
      { opcode: 'Push', operands: [0] },// initialize eq
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [1] },
      { opcode: 'Not' },

      { opcode: 'Store', operands: [1] }, // store true
      { opcode: 'Halt' }
    ])
  }))

  it('a = not false', compile('let a : boolean = not false;', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.deep.eq(1)
  }))

  it('a = not 20', compile('let a : boolean = not 20;', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.deep.eq(0)
  }))
})
