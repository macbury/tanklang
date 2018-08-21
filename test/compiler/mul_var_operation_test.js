import { expect } from 'chai'
import { VirtualMachine } from '../../src/virtual_machine'
import Compiler from '../../src/compiler'
import { readFileSync } from 'fs'

describe('Compiler', function () {

  describe('sub variable', function() {
    it('generate byte code', function () {
      let compiler = new Compiler()
      let bytecode = compiler.compile(readFileSync('./test/factories/multi_var_operation.tank'))
      expect(bytecode.toArray()).to.deep.eq([
        { opcode: 'Push', operands: [0] },// initialize someVal
        { opcode: 'Store', operands: [1] }, 

        { opcode: 'Push', operands: [13] }, // set someVal to 13
        { opcode: 'Store', operands: [1] },

        { opcode: 'Push', operands: [0] }, // initialize result
        { opcode: 'Store', operands: [2] },

        { opcode: 'Load', operands: [1] }, // load someVal
        { opcode: 'Push', operands: [20] }, // push 20
        { opcode: 'Sub' }, // sub 13 - 20

        { opcode: 'Store', operands: [2] }, // save -7 into result
        
        { opcode: 'Halt' }
      ])
    })

    it('can run on vm', function() {
      let compiler = new Compiler()
      let bytecode = compiler.compile(readFileSync('./test/factories/multi_var_operation.tank'))
      let program = bytecode.toProgram()
      let vm = new VirtualMachine(program)
      vm.run()

      expect(vm.frame.get(2)).to.deep.eq(-7)
    })
  })
})
