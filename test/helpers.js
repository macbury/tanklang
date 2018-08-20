import { VirtualMachine } from '../src/virtual_machine'

export function withVM(instructions, callback) {
  return function(done) {
    let vm = new VirtualMachine(instructions, )
    callback(vm)
    done()
  }
}
