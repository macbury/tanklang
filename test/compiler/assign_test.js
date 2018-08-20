import { expect } from 'chai'
import Compiler from '../../src/compiler'
import Opcode from '../../src/opcodes'

describe('Compiler', function () {

  it('generate assign opcodes', function () {
    let compiler = new Compiler()
    let ast = compiler.generateAst('let a : number = 3')
    debugger
    expect(ast).to.eq({})
  })
})
