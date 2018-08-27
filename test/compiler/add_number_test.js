import { expect } from 'chai'
import { VirtualMachine } from '../../src/virtual_machine'
import Compiler from '../../src/compiler'
import { readFileSync } from 'fs'

describe('Add number', function () {
  it('generate byte code', function () {
    let compiler = new Compiler()
    let bytecode = compiler.compile(readFileSync('./test/factories/add_number.tank'))
    expect(bytecode.toArray()).to.deep.eq([
      { opcode: 'Push', operands: [0] },// initialize c
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [6] }, // push 8
      { opcode: 'Push', operands: [8] }, // push 6
      { opcode: 'Add' }, // sum 6 + 8
      { opcode: 'Store', operands: [1] }, // save 14 into c
      { opcode: 'Halt' }
    ])
  })

  it('can run on vm', async function() {
    let compiler = new Compiler()
    let bytecode = compiler.compile(readFileSync('./test/factories/add_number.tank'))
    let program = bytecode.toProgram()
    let vm = new VirtualMachine(program)

    await vm.run()

    expect(vm.frame.get(1)).to.deep.eq(14)
    expect(vm.stack.toArray()).to.be.empty
  })
})
