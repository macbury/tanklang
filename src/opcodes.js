import OpcodesBuilder from './opcode_builder'

function sameType(a, b) {
  return typeof(a) == typeof(b)
}

const Opcodes = new OpcodesBuilder()
export default Opcodes

Opcodes.register('Halt', async function(vm) {
  vm.halted = true
})

Opcodes.register('Push', async function(vm) {
  let value = vm.next("Should have the value after the Push instruction")
  vm.stack.push(value)
})

Opcodes.register('Pop', async function(vm) {
  vm.stack.pop()
})

Opcodes.register('Dup', async function(vm) {
  vm.stack.push(vm.stack.peek())
})

Opcodes.register('Add', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left + right)
})

Opcodes.register('Sub', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left - right)
})

Opcodes.register('Mul', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left * right)
})

Opcodes.register('Div', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left / right)
})

Opcodes.register('Not', async function(vm) {
  let value = vm.stack.popBoolean()
  vm.stack.push(!value)
})

Opcodes.register('And', async function(vm) {
  let right = vm.stack.popBoolean()
  let left = vm.stack.popBoolean()
  vm.stack.push(left && right)
})

Opcodes.register('Or', async function(vm) {
  let right = vm.stack.popBoolean()
  let left = vm.stack.popBoolean()
  vm.stack.push(left || right)
})

Opcodes.register('IsEq', async function(vm) {
  let right = vm.stack.pop()
  let left = vm.stack.pop()
  vm.stack.push(sameType(left, right) && left === right)
})

Opcodes.register('IsGt', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(sameType(left, right) && left > right)
})

Opcodes.register('IsGte', async function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(sameType(left, right) && left >= right)
})

Opcodes.register('Load', async function(vm) {
  let varNumber = vm.next("Should have the variable number after the Load instruction")
  let value = vm.frame.get(varNumber)
  vm.stack.push(value)
})

Opcodes.register('Store', async function(vm) {
  let varNumber = vm.next("Should have the variable number after the Store instruction")
  vm.frame.set(varNumber, vm.stack.pop())
})

Opcodes.register('Jmp', async function(vm) {
  let address = vm.next("Should have the instruction address after the Jmp instruction")
  vm.ip = address
})

Opcodes.register('Jif', async function(vm) {
  let left = vm.stack.popBoolean()
  let address = vm.next("Should have the instruction address after the Jif instruction")
  if (left) {
    vm.ip = address
  }
})

Opcodes.register('Call', async function(vm) {
  let address = vm.next("Should have the instruction address after the Call instruction")
  vm.frames.push(vm.ip)
  vm.ip = address
})

Opcodes.register('Ret', async function(vm) {
  vm.ip = vm.frames.pop()
})
