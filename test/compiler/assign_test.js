import { expect } from 'chai'
import Compiler from '../../src/compiler'
import { readFileSync } from 'fs'
import { compile, loadAndcompile } from '../helpers'

describe('Assign', function () {

  it('a = false', compile('let eq : boolean = false;', function(vm, bytecode) {
    expect(vm.frame.get(1)).to.deep.eq(0)
    
    expect(bytecode).to.deep.eq([
      { opcode: 'Push', operands: [0] },// initialize eq
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [0] },
      { opcode: 'Store', operands: [1] }, // store false
      { opcode: 'Halt' }
    ])
  }))

  it('a = true', compile('let eq : boolean = true;', function(vm, bytecode) {
    expect(vm.frame.get(1)).to.deep.eq(1)
    
    expect(bytecode).to.deep.eq([
      { opcode: 'Push', operands: [0] },// initialize eq
      { opcode: 'Store', operands: [1] }, 

      { opcode: 'Push', operands: [1] },
      { opcode: 'Store', operands: [1] }, // store false
      { opcode: 'Halt' }
    ])
  }))

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
      let bytecode = compiler.compile('let a : number = 3;')
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
