import chai from 'chai'
import { expect } from 'chai'
import { VirtualMachine } from '../src/virtual_machine'
import { ArrayIO } from '../src/io'
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

export function expectToRaiseCompileError(content, message) {
  return function() {
    let compiler = new Compiler()
    expect(() => compiler.compile(content)).to.throw(message)
  }
}

export function expectToRaiseOutOfPowerError(content, callback) {
  return async function() {
    let compiler = new Compiler()
    let bytecode = compiler.compile(content)
    let { code, sourceMap } = bytecode.toProgram()

    let vm = new VirtualMachine(code)
    vm.voltage = 1000
    
    await expect(vm.run()).be.rejectedWith(Error, /Out of power/)
    await callback(vm, bytecode.toArray())
  }
}

export function expectToLoadAndRaiseCompileError(path, message) {
  return function() {
    let compiler = new Compiler()
    let content = readFileSync(path)
    expect(() => compiler.compile(content)).to.throw(message)
  }
}

export function loadAndcompile(path, callback) {
  return async function() {
    let compiler = new Compiler()
    let bytecode = compiler.compile(cache[path] || readFileSync(path))
    let { code, sourceMap } = bytecode.toProgram()

    let vm = new VirtualMachine(code)
    vm.io = new ArrayIO()
    
    await vm.run()
    await callback(vm, bytecode.toArray(), sourceMap)
  }
}


export function compile(content, callback) {
  return async function() {
    let compiler = new Compiler()
    let bytecode = compiler.compile(content)
    let { code, sourceMap } = bytecode.toProgram()
    
    let vm = new VirtualMachine(code)
    vm.io = new ArrayIO()
    await vm.run()
    await callback(vm, bytecode.toArray(), sourceMap)
  }
}
