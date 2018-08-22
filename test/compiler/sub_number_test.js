import { expect } from 'chai'
import { VirtualMachine } from '../../src/virtual_machine'
import Compiler from '../../src/compiler'
import { readFileSync } from 'fs'

describe('-', function () {
  it('generate byte code', function () {
    let compiler = new Compiler()
    let bytecode = compiler.compile(readFileSync('./test/factories/sub_number.tank'))
    expect(bytecode.toArray()).to.deep.eq([
      { opcode: 'Push', operands: [0] },// initialize c
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [3] }, // push 8
      { opcode: 'Push', operands: [5] }, // push 6
      { opcode: 'Sub' }, // sum 6 + 8
      { opcode: 'Store', operands: [1] }, // save 14 into c
      { opcode: 'Halt' }
    ])
  })

  it('can run on vm', function() {
    let compiler = new Compiler()
    let bytecode = compiler.compile(readFileSync('./test/factories/sub_number.tank'))
    let program = bytecode.toProgram()
    let vm = new VirtualMachine(program)

    vm.run()

    expect(vm.frame.get(1)).to.deep.eq(-2)
    expect(vm.stack.toArray()).to.be.empty
  })
})
