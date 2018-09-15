import { expect } from 'chai'
import { loadAndcompile, expectToLoadAndRaiseCompileError } from '../helpers'

describe('return', function () {
  it('allows to return value to assigned variable', loadAndcompile('./test/factories/methods/return.tank', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(1000)
    expect(bytecode).to.deep.eq([
      { opcode: 'Push', operands: [0] }, // initialize hello variable
      { opcode: 'Store', operands: [1] },

      { opcode: 'Jmp', operands: [12] }, // dont run method,

      { opcode: 'Push', operands: [1000] },
      { opcode: 'Ret' },

      { opcode: 'Push', operands: [0] },
      { opcode: 'Ret' },

      { opcode: 'Call', operands: [6] },
      { opcode: 'Store', operands: [1] },
      { opcode: 'Halt' }
    ])
  }))

  it('can operate on passed variables', loadAndcompile('./test/factories/methods/max.tank', async function(vm, bytecode) {
    expect(vm.frame.get(4)).to.eq(20)
    expect(vm.frame.get(5)).to.eq(30)
  }))

  it('can sum two variables and be triggered without return', loadAndcompile('./test/factories/methods/sum.tank', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(12)
  }))

  // it.only('return diffrent type raises exception', expectToLoadAndRaiseCompileError(
  //   './test/factories/methods/return_diffrent_type.tank',
  //   'Argument number 1 should be boolean but is number for method explode at line 5'
  // ))
})
