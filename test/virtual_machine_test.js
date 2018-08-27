import { expect } from 'chai'
import { withVM } from './helpers'
import Opcodes from '../src/opcodes'

describe('VirtualMachine', function() {
  describe('set ip', function() {
    it('allows to set number', withVM([1,2,3], function(vm) {
      vm.ip = 1
    }))

    it('throws error if address is outside of program', withVM([], function(vm) {
      expect(() => vm.ip = 1000).to.throw(/Address 1000 is outside of program/)
    }))

    it('throws error if setting something other than number', withVM([], function(vm) {
      expect(() => vm.ip = 'blow this').to.throw(/Address blow this is invalid/)
    }))
  })
})
