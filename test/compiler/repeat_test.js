import { expect } from 'chai'
import { loadAndcompile } from '../helpers'

describe('repeat', function () {
  it('10 times)', loadAndcompile('./test/factories/repeat.tank', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(10)
  }))

  it('nested repeat', loadAndcompile('./test/factories/nested_repeat.tank', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(1000)
  }))
})
