import { expect } from 'chai'
import { loadAndcompile, expectToLoadAndRaiseCompileError } from '../helpers'

describe('methods', function () {
  it('recurrence', loadAndcompile('./test/factories/methods/recurrence.tank', async function(vm, bytecode, sourceMap) {
    expect(vm.frame.get(1)).to.eq(11)
  }))

  it('multiple methods execution', loadAndcompile('./test/factories/methods/multi_exec.tank', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(6)
  }))

  it('chain methods', loadAndcompile('./test/factories/methods/multiple_method.tank', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(1)
  }))

  it('validate number of args passed', expectToLoadAndRaiseCompileError(
    './test/factories/methods/diffrent_no_of_args.tank',
    'Method test have 2 arguments but you passed 5 at line 5'
  ))

  it('diffrent types for arguments', expectToLoadAndRaiseCompileError(
    './test/factories/methods/diffrent_args.tank',
    'Argument number 1 should be boolean but is number for method explode at line 5'
  ))

  it('generating method', loadAndcompile('./test/factories/methods/simple.tank', async function(vm, bytecode) {
    expect(vm.frame.get(3)).to.eq(3000)

    expect(bytecode).to.deep.eq([
      { opcode: 'Push', operands: [0] },// initialize a
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [1000] }, // set a to 1000
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [0] },// initialize b
      { opcode: 'Store', operands: [2] }, 

      { opcode: 'Push', operands: [2000] }, // set b to 2000
      { opcode: 'Store', operands: [2] }, 

      { opcode: 'Push', operands: [0] },// initialize c
      { opcode: 'Store', operands: [3] }, 

      { opcode: 'Push', operands: [0] }, // set c to 0
      { opcode: 'Store', operands: [3] }, 

      { opcode: 'Jmp', operands: [40] }, // skip method block

      { opcode: 'Store', operands: [5] }, // initialize argA
      { opcode: 'Store', operands: [6] }, // initialize argB

      { opcode: 'Load', operands: [5] }, // load argA
      { opcode: 'Load', operands: [6] }, // load argB

      { opcode: 'Add' }, // sum arguments

      { opcode: 'Store', operands: [3] }, // store sum of args to c
      { opcode: 'Push', operands: [0] }, 
      { opcode: 'Ret' }, // return from simpleMerhod

      { opcode: 'Load', operands: [1] }, //load a
      { opcode: 'Load', operands: [2] }, //load b
      { opcode: 'Call', operands: [26] }, //call method
      { opcode: 'Pop' }, 

      { opcode: 'Halt' }
    ])
  }))
})
