import { VirtualMachine } from '../src/virtual_machine'
import Compiler from '../src/compiler'
import { readFileSync } from 'fs'

export function withVM(instructions, callback) {
  return function(done) {
    let vm = new VirtualMachine(instructions)
    callback(vm)
    done()
  }
}

export function compile(path, callback) {
  return function(done) {
    let compiler = new Compiler()
    let bytecode = compiler.compile(readFileSync(path))
    let program = bytecode.toProgram()
    let vm = new VirtualMachine(program)
    vm.run()
    callback(vm, bytecode.toArray())
    done()
  }
}