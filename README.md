## Example program

```
# global variables

let a : number;
let b : number = 3;
let c = 13;

b = 2;
a = 2;

c = a + b;

repeat(5) {
  print(c);
}

methodExample(a : number, b : number) {
  let c : number = a + b;
}

otherMethodExample(a : number, b : number) : number {
  return a + b;
}

let d : number = otherMethodExample(2, 3);

```

return should just simply push value on stack

# Reference

https://github.com/harc/ohm/blob/master/doc/syntax-reference.md
https://ohmlang.github.io/editor/
https://ruslanspivak.com/lsbasi-part7/
https://www.pubnub.com/blog/2016-09-08-build-your-own-symbol-calculator-with-ohm/

# TODO
* text
* validate for return keyword
* casting
* stdlib
