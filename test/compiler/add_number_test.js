import { expect } from 'chai'
import Compiler from '../../src/compiler'
import Opcode from '../../src/opcodes'
import { readFileSync } from 'fs'

describe('Compiler', function () {

  describe('add number', function() {
    it('generate bytecode', function () {
      let compiler = new Compiler()
      let bytecode = compiler.compile(readFileSync('./test/factories/add_number.tank'))
      expect(bytecode.toArray()).to.deep.eq([
        Opcode.Push, 0, // initialize a
        Opcode.Store, 1, 
        Opcode.Push, 6, // load 6 to a
        Opcode.Store, 1,

        Opcode.Push, 0,  // initialize b
        Opcode.Store, 2, 
        Opcode.Push, 8, // load 8 to b
        Opcode.Store, 2,

        Opcode.Load, 2, // load b to stack
        Opcode.Load, 1, // load a to stack
        Opcode.Add, // sum them!
        Opcode.Halt
      ])
    })
  })
})
