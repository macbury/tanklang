import { expect } from 'chai'
import { withVM } from '../helpers'
import Opcodes from '../../src/opcodes'

describe('VirtualMachine', function() {
  describe('stack', function() {
    it('Pop', withVM([Opcodes.Pop], async function(vm) {
      vm.stack.set([33])
      expect(await(vm.step())).to.be.false
      expect(vm.ip).to.eq(1)
      expect(vm.halted).to.be.true
      expect(vm.stack.toArray()).to.deep.empty
    }))

    it('Push', withVM([Opcodes.Push, 2], async function(vm) {
      expect(await(vm.step()), "to be final step").to.be.false
      expect(vm.ip).to.eq(2)
      expect(vm.halted, "to be halted").to.be.true
      expect(vm.stack.toArray()).to.deep.eq([2])
    }))

    it('Dup', withVM([Opcodes.Dup], async function(vm) {
      vm.stack.set([11])
      expect(await(vm.step()), "to be final step").to.be.false
      expect(vm.ip).to.eq(1)
      expect(vm.halted, "to be halted").to.be.true
      expect(vm.stack.toArray()).to.deep.eq([11, 11])
    }))
  })
})
