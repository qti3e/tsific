/*!
  MIT License

  Copyright (c) 2018 Parsa Ghadimi <me@qti3e.com>.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

import { Unit } from "./types";

export class Add implements Unit {
  constructor(private a: Unit, private b: Unit) {}

  forward(vars) {
    return this.a.forward(vars) + this.b.forward(vars);
  }

  backward(vars) {
    return this.a.backward(vars) + this.b.backward(vars);
  }

  toString() {
    return "(" + this.a + " + " + this.b + ")";
  }
}

export class Sub implements Unit {
  constructor(private a: Unit, private b: Unit) {}

  forward(vars) {
    return this.a.forward(vars) - this.b.forward(vars);
  }

  backward(vars) {
    return this.a.backward(vars) - this.b.backward(vars);
  }

  toString() {
    return "(" + this.a + " - " + this.b + ")";
  }
}

export class Mul implements Unit {
  constructor(private a: Unit, private b: Unit) {}

  forward(vars) {
    return this.a.forward(vars) * this.b.forward(vars);
  }

  backward(vars) {
    return (
      (this.a.forward(vars) * this.b.backward(vars)) +
      (this.a.backward(vars) * this.b.forward(vars))
    );
  }

  toString() {
    return "(" + this.a + " * " + this.b + ")";
  }
}

export class Div implements Unit {
  constructor(private a: Unit, private b: Unit) {}

  forward(vars) {
    return this.a.forward(vars) / this.b.forward(vars);
  }

  backward(vars) {
    const b = this.b.forward(vars);
    return (
      (
        (this.a.backward(vars) * b) -
        (this.a.forward(vars) * this.b.backward(vars))
      ) / (b ** 2)
    );
  }

  toString() {
    return "(" + this.a + " / " + this.b + ")";
  }
}