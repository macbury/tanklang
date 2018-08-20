import { expect } from 'chai'
import { withVM } from '../helpers'
import Opcodes from '../../src/opcodes'

describe('VirtualMachine', function() {
  describe('math', function() {
    describe('Add', function() {
      it('with two numbers on stack', withVM([Opcodes.Add], function(vm) {
        vm.stack.set([2, 3])
        expect(vm.step(), "to be final step").to.be.false
        expect(vm.ip).to.eq(1)
        expect(vm.halted, "to be halted").to.be.true
        expect(vm.stack.toArray()).to.deep.eq([5])
      }))

      it('with less than two elements on stack', withVM([Opcodes.Add], function(vm) {
        vm.stack.set([2])
        expect(() => vm.step(), "throw error about bad stack").to.throw(/Stack underflow error/)
      }))
    })

    describe('Sub', function() {
      it('with two numbers on stack', withVM([Opcodes.Sub], function(vm) {
        vm.stack.set([2, 3])
        expect(vm.step(), "to be final step").to.be.false
        expect(vm.ip).to.eq(1)
        expect(vm.halted, "to be halted").to.be.true
        expect(vm.stack.toArray()).to.deep.eq([-1])
      }))

      it('with less than two elements on stack', withVM([Opcodes.Sub], function(vm) {
        vm.stack.set([2])
        expect(() => vm.step(), "throw error about bad stack").to.throw(/Stack underflow error/)
      }))
    })

    describe('Mul', function() {
      it('with two numbers on stack', withVM([Opcodes.Mul], function(vm) {
        vm.stack.set([2, 3])
        expect(vm.step(), "to be final step").to.be.false
        expect(vm.ip).to.eq(1)
        expect(vm.halted, "to be halted").to.be.true
        expect(vm.stack.toArray()).to.deep.eq([6])
      }))

      it('with less than two elements on stack', withVM([Opcodes.Mul], function(vm) {
        vm.stack.set([2])
        expect(() => vm.step(), "throw error about bad stack").to.throw(/Stack underflow error/)
      }))
    })

    describe('Div', function() {
      it('with two numbers on stack', withVM([Opcodes.Div], function(vm) {
        vm.stack.set([6, 3])
        expect(vm.step(), "to be final step").to.be.false
        expect(vm.ip).to.eq(1)
        expect(vm.halted, "to be halted").to.be.true
        expect(vm.stack.toArray()).to.deep.eq([2])
      }))

      it('with less than two elements on stack', withVM([Opcodes.Div], function(vm) {
        vm.stack.set([2])
        expect(() => vm.step(), "throw error about bad stack").to.throw(/Stack underflow error/)
      }))
    })
  })
})