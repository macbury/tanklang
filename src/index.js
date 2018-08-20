import Compiler from './compiler'
import { VirtualMachine } from './virtual_machine'

let compiler = new Compiler()
try {
  let bytecode = compiler.compile('let a : nsumber = 3')
  let vm = new VirtualMachine(bytecode)
  vm.run()
} catch (e) {
  console.error(e)
  debugger
}

