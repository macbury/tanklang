import { expect } from 'chai'
import { loadAndcompile } from '../helpers'

describe('repeat', function () {
  it('10 times)', loadAndcompile('./test/factories/repeat.tank', function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(10)
  }))

  it('nested repeat', loadAndcompile('./test/factories/nested_repeat.tank', function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(1000)
  }))
})
