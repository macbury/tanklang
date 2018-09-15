import OpcodesBuilder from './opcode_builder'

function sameType(a, b) {
  return typeof(a) == typeof(b)
}

const Opcodes = new OpcodesBuilder()
export default Opcodes

Opcodes.register('Halt', async function(vm) {
  vm.halted = true
}).setCharge(0)

Opcodes.register('Push', async function(vm) {
  let value = vm.next("Should have the value after the Push instruction")
  vm.stack.push(value)
}).setCharge(2)

Opcodes.register('Pop', async function(vm) {
  vm.stack.pop()
}).setCharge(2)

Opcodes.register('Dup', async function(vm) {
  vm.stack.push(vm.stack.peek())
}).setCharge(3)

Opcodes.register('Add', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left + right)
}).setCharge(3)

Opcodes.register('Sub', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left - right)
}).setCharge(3)

Opcodes.register('Mul', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left * right)
}).setCharge(5)

Opcodes.register('Div', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left / right)
}).setCharge(5)

Opcodes.register('Not', async function(vm) {
  let value = vm.stack.popBoolean()
  vm.stack.push(!value)
}).setCharge(2)

Opcodes.register('And', async function(vm) {
  let right = vm.stack.popBoolean()
  let left = vm.stack.popBoolean()
  vm.stack.push(left && right)
}).setCharge(2)

Opcodes.register('Or', async function(vm) {
  let right = vm.stack.popBoolean()
  let left = vm.stack.popBoolean()
  vm.stack.push(left || right)
}).setCharge(2)

Opcodes.register('IsEq', async function(vm) {
  let right = vm.stack.pop()
  let left = vm.stack.pop()
  vm.stack.push(sameType(left, right) && left === right)
}).setCharge(2)

Opcodes.register('IsGt', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(sameType(left, right) && left > right)
}).setCharge(2)

Opcodes.register('IsGte', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(sameType(left, right) && left >= right)
}).setCharge(2)

Opcodes.register('Load', async function(vm) {
  let varNumber = vm.next("Should have the variable number after the Load instruction")
  let value = vm.frame.get(varNumber)
  vm.stack.push(value)
}).setCharge(3)

Opcodes.register('Store', async function(vm) {
  let varNumber = vm.next("Should have the variable number after the Store instruction")
  vm.frame.set(varNumber, vm.stack.pop())
}).setCharge(3)

Opcodes.register('Jmp', async function(vm) {
  let address = vm.next("Should have the instruction address after the Jmp instruction")
  vm.ip = address
}).setCharge(8)

Opcodes.register('Jif', async function(vm) {
  let left = vm.stack.popBoolean()
  let address = vm.next("Should have the instruction address after the Jif instruction")
  if (left) {
    vm.ip = address
  }
}).setCharge(10)

Opcodes.register('Call', async function(vm) {
  let address = vm.next("Should have the instruction address after the Call instruction")
  vm.frames.push(vm.ip)
  vm.ip = address
}).setCharge(40)

Opcodes.register('Ret', async function(vm) {
  vm.ip = vm.frames.pop()
}).setCharge(5)

Opcodes.register('Print', async function(vm) {
  let message = vm.stack.pop().toString()
  vm.charge(2 * message.length)
  vm.io.print(message.toString())
}).setCharge(5)

Opcodes.register('ToNumber', async function(vm) {
  let value = parseInt(vm.stack.pop()) || 0
  vm.stack.push(value)
}).setCharge(3)

Opcodes.register('ToBoolean', async function(vm) {
  let value = parseInt(vm.stack.pop())
  vm.stack.push(value == 1 ? 1 : 0)
}).setCharge(3)

Opcodes.register('ToString', async function(vm) {
  let value = vm.stack.pop().toString()
  vm.stack.push(value)
}).setCharge(3)

Opcodes.register('Rnd', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(vm.random.between(left, right))
}).setCharge(3)
