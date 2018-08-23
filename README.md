[ ![Codeship Status for macbury/tanklang](https://app.codeship.com/projects/0129e650-873e-0136-d478-3e27c1ec70f0/status?branch=master)](https://app.codeship.com/projects/302613)

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

# Reference

https://github.com/harc/ohm/blob/master/doc/syntax-reference.md
https://ohmlang.github.io/editor/
https://ruslanspivak.com/lsbasi-part7/
https://www.pubnub.com/blog/2016-09-08-build-your-own-symbol-calculator-with-ohm/
