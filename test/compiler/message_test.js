import { expect } from 'chai'
import { compile } from '../helpers'

describe('message', function () {
  it('print text to io', compile('message("Hello world!");', async function(vm, bytecode) {
    expect(bytecode).to.deep.eq([
      { opcode: 'Push', operands: ["Hello world!"] },
      { opcode: 'Print' },

      { opcode: 'Halt' }
    ])
    expect(vm.io.content).to.deep.eq(['Hello world!'])
  }))

  it('print boolean to io', compile('message(true);', async function(vm, bytecode) {
    expect(vm.io.content).to.deep.eq(['1'])
  }))

  it('print number to io', compile('message(1000);', async function(vm, bytecode) {
    expect(vm.io.content).to.deep.eq(['1000'])
  }))
})
