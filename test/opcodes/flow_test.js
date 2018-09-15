import { expect } from 'chai'
import { withVM } from '../helpers'
import Opcodes from '../../src/opcodes'

describe('VirtualMachine', function() {
  describe('flow', function() {
    it('Halt', withVM([Opcodes.Halt, Opcodes.Push], async function(vm) {
      expect(await(vm.step())).to.be.false
      await expect(vm.step()).be.rejectedWith(Error, /VM is halted!/)
      expect(vm.ip).to.eq(1)
      expect(vm.halted).to.be.true
      expect(vm.stack.toArray()).to.be.empty
    }))

    describe('Jmp', function() {
      it('set ip to address', withVM([Opcodes.Push, 1, Opcodes.Jmp, 0], async function(vm) {
        await vm.step()
        expect(vm.ip).to.eq(2)
        await vm.step()
        expect(vm.ip).to.eq(0)
      }))

      it('throws error if trying to jump to something other than address', withVM([Opcodes.Jmp, 'sss'], async function(vm) {
        await expect(vm.step()).be.rejectedWith(Error, /Address sss is invalid/)
      }))

      it('requires address operand', withVM([Opcodes.Jmp], async function(vm) {
        await expect(vm.step()).be.rejectedWith(Error, /Should have the instruction address after the Jmp instruction/)
      }))
    })

    describe('Jif', function() {
      it('jump if true', withVM([Opcodes.Push, 1, Opcodes.Jif, 0], async function(vm) {
        await vm.step()
        expect(vm.ip).to.eq(2)
        await vm.step()
        expect(vm.ip).to.eq(0)
        expect(vm.halted).to.be.false
      }))

      it('dont jump if false', withVM([Opcodes.Push, 0, Opcodes.Jif, 0], async function(vm) {
        expect(await(vm.step())).to.be.true
        expect(await(vm.step())).to.be.false
        expect(vm.halted).to.be.true
      }))

      it('requires address operand', withVM([Opcodes.Jif], async function(vm) {
        vm.stack.set([2])
        await expect(vm.step()).be.rejectedWith(Error, /Should have the instruction address after the Jif instruction/)
      }))

      it('requires value on stack', withVM([Opcodes.Jif], async function(vm) {
        await expect(vm.step()).be.rejectedWith(Error, /Stack underflow error/)
      }))
    })
  })
})
