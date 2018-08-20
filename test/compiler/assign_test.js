import { expect } from 'chai'
import Compiler from '../../src/compiler'
import Opcode from '../../src/opcodes'

describe('Compiler', function () {

  it('generate assign opcodes', function () {
    let compiler = new Compiler()
    let bytecode = compiler.compile('let a : number = 3')
    expect(bytecode).to.deep.eq([Opcode.Push, 3, Opcode.Store, 0, Opcode.Halt])
  })
})
