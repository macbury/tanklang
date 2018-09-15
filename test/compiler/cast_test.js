import { expect } from 'chai'
import { compile, loadAndcompile } from '../helpers'

describe('cast', function () {
  it('number(boolean)', compile('let eq : number = number(true);', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(1)
  }))

  it('boolean(number)', compile('let eq : boolean = boolean(1);', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(1)
  }))

  it('text(number)', compile('let eq : text = text(1);', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq('1')
  }))

  it('text(text)', compile('let eq : text = text("123");', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq('123')
  }))

  it('number(text)', compile('let eq : number = number("999");', async function(vm, bytecode) {
    expect(vm.frame.get(1)).to.eq(999)
  }))
})
