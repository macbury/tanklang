export class IO {
  print(data) {
    
  }
}

export class ConsoleIO extends IO {
  print(data) {
    super.print()
    console.log(data)
  }
}
