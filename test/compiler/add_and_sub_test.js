import { expect } from 'chai'
import { VirtualMachine } from '../../src/virtual_machine'
import Compiler from '../../src/compiler'
import { readFileSync } from 'fs'

describe('Add number and sub', function () {
  it('generate byte code', function () {
    let compiler = new Compiler()
    let bytecode = compiler.compile(readFileSync('./test/factories/add_and_sub.tank'))
    expect(bytecode.toArray()).to.deep.eq([
      { opcode: 'Push', operands: [0] },// initialize c
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [2] }, // push 3
      { opcode: 'Push', operands: [3] }, // push 2
      { opcode: 'Add' }, // sum 2 + 3

      { opcode: 'Push', operands: [1] }, // push 3
      { opcode: 'Sub' }, // sum 5 - 1

      { opcode: 'Store', operands: [1] }, // save 4 into c
      { opcode: 'Halt' }
    ])
  })

  it('can run on vm', function() {
    let compiler = new Compiler()
    let bytecode = compiler.compile(readFileSync('./test/factories/add_and_sub.tank'))
    let program = bytecode.toProgram()
    let vm = new VirtualMachine(program)
    vm.run()

    expect(vm.frame.get(1)).to.deep.eq(4)
  })
})
