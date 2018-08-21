import { expect } from 'chai'
import Compiler from '../../src/compiler'
import Opcode from '../../src/opcodes'
import { readFileSync } from 'fs'

describe('Compiler', function () {

  describe('add number', function() {
    xit('generate bytecode', function () {
      let compiler = new Compiler()
      let bytecode = compiler.compile(readFileSync('./test/factories/add_number.tank'))
      expect(bytecode.toArray()).to.deep.eq([
        { opcode: 'Push', operands: [0] },// initialize a
        { opcode: 'Store', operands: [1] }, 
        { opcode: 'Push', operands: [6] },// load 6 to a
        { opcode: 'Store', operands: [1] },

        { opcode: 'Push', operands: [0] },// initialize b
        { opcode: 'Store', operands: [2] }, 
        { opcode: 'Push', operands: [8] },// load 8 to b
        { opcode: 'Store', operands: [2] }, 

        { opcode: 'Load', operands: [2] },
        { opcode: 'Load', operands: [1] },
        { opcode: 'Add' },
        { opcode: 'Halt' }
      ])
    })
  })
})
