import chai from 'chai'
import { VirtualMachine } from '../src/virtual_machine'
import Compiler from '../src/compiler'
import { readFileSync } from 'fs'
import chaiAsPromised from "chai-as-promised"

const cache = {}

chai.use(chaiAsPromised);

export function withVM(instructions, callback) {
  return async function() {
    let vm = new VirtualMachine(instructions)
    await callback(vm)
  }
}

export function loadAndcompile(path, callback) {
  return async function() {
    let compiler = new Compiler()
    let bytecode = compiler.compile(cache[path] || readFileSync(path))
    let program = bytecode.toProgram()
    let vm = new VirtualMachine(program)
    
    await vm.run()
    await callback(vm, bytecode.toArray())
  }
}

export function compile(content, callback) {
  return async function() {
    let compiler = new Compiler()
    let bytecode = compiler.compile(content)
    let program = bytecode.toProgram()
    let vm = new VirtualMachine(program)
    await vm.run()
    await callback(vm, bytecode.toArray())
  }
}
