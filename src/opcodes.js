import OpcodesBuilder from './opcode_builder'

function sameType(a, b) {
  return typeof(a) == typeof(b)
}

const Opcodes = new OpcodesBuilder()
export default Opcodes

Opcodes.register('Halt', function(vm) {
  vm.halted = true
})

Opcodes.register('Push', function(vm) {
  let value = vm.next("Should have the value after the Push instruction")
  vm.stack.push(value)
})

Opcodes.register('Pop', function(vm) {
  vm.stack.pop()
})

Opcodes.register('Dup', function(vm) {
  vm.stack.push(vm.stack.peek())
})

Opcodes.register('Add', function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left + right)
})

Opcodes.register('Sub', function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left - right)
})

Opcodes.register('Mul', function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left * right)
})

Opcodes.register('Div', function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(left / right)
})

Opcodes.register('Not', function(vm) {
  let value = vm.stack.popBoolean()
  vm.stack.push(!value)
})

Opcodes.register('And', function(vm) {
  let right = vm.stack.popBoolean()
  let left = vm.stack.popBoolean()
  vm.stack.push(left && right)
})

Opcodes.register('Or', function(vm) {
  let right = vm.stack.popBoolean()
  let left = vm.stack.popBoolean()
  vm.stack.push(left || right)
})

Opcodes.register('IsEq', function(vm) {
  let right = vm.stack.pop()
  let left = vm.stack.pop()
  vm.stack.push(sameType(left, right) && left === right)
})

Opcodes.register('IsGt', function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(sameType(left, right) && left > right)
})

Opcodes.register('IsGte', function(vm) {
  let right = vm.stack.popNumber()
  let left = vm.stack.popNumber()
  vm.stack.push(sameType(left, right) && left >= right)
})

Opcodes.register('Load', function(vm) {
  let varNumber = vm.next("Should have the variable number after the Load instruction")
  let value = vm.frame.get(varNumber)
  vm.stack.push(value)
})

Opcodes.register('Store', function(vm) {
  let varNumber = vm.next("Should have the variable number after the Store instruction")
  vm.frame.set(varNumber, vm.stack.pop())
})

Opcodes.register('Jmp', function(vm) {
  let address = vm.next("Should have the instruction address after the Jmp instruction")
  vm.ip = address
})

Opcodes.register('Jif', function(vm) {
  let left = vm.stack.popBoolean()
  let address = vm.next("Should have the instruction address after the Jif instruction")
  if (left) {
    vm.ip = address
  }
})

Opcodes.register('Call', function(vm) {
  let address = vm.next("Should have the instruction address after the Call instruction")
  vm.frames.push(vm.ip)
  vm.ip = address
})

Opcodes.register('Ret', function(vm) {
  vm.ip = vm.frames.pop()
})
