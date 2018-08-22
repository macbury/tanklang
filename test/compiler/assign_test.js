import { expect } from 'chai'
import Compiler from '../../src/compiler'
import { readFileSync } from 'fs'

describe('Assign', function () {

  describe('assign multiple variables', function() {
    it('generate bytecode', function () {
      let compiler = new Compiler()
      let bytecode = compiler.compile(readFileSync('./test/factories/multiassign.tank'))
      expect(bytecode.toArray()).to.deep.eq([
        { opcode: 'Push', operands: [0] }, // declare test
        { opcode: 'Store', operands: [1] },
        { opcode: 'Push', operands: [77] }, //load 77 to test
        { opcode: 'Store', operands: [1] },
        { opcode: 'Push', operands: [0] }, //declare c
        { opcode: 'Store', operands: [2] },
        { opcode: 'Push', operands: [0] }, // declare b
        { opcode: 'Store', operands: [3] },
        { opcode: 'Push', operands: [1] }, // load true to b
        { opcode: 'Store', operands: [3] },
        { opcode: 'Halt' }
      ])
    })
  })

  describe('let a : number = 3', function() {
    it('generate bytecode', function () {
      let compiler = new Compiler()
      let bytecode = compiler.compile('let a : number = 3')
      expect(bytecode.toArray()).to.deep.eq([
        { opcode: 'Push', operands: [0] },
        { opcode: 'Store', operands: [1] },
        { opcode: 'Push', operands: [3] },
        { opcode: 'Store', operands: [1] },
        { opcode: 'Halt' }
      ])
    })
  })
})
