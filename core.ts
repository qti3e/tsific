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

import * as op from "./ops";
import { Unit, UnitLike } from "./types";

const vars = new Map<string, Unit>();

function toUnit(u: UnitLike): Unit {
  if (typeof u === "string") {
    if (vars.has(u)) {
      return vars.get(u);
    }
    return new Var(u);
  } else if (typeof u === "number") {
    return new Num(u);
  } else if (u instanceof E) {
    return u.head;
  }
  return u;
}

class Num implements Unit {
  constructor(private value: number) {}

  forward() {
    return this.value;
  }

  backward() {
    return 0;
  }

  toString() {
    return this.value + "";
  }
}

export class Var implements Unit {
  constructor(private name: string) {
    vars.set(name, this);
  }

  forward(vars) {
    return vars[this.name];
  }

  backward(vars) {
    return 0;
  }

  toString() {
    return this.name;
  }
}

export class E implements Unit {
  head: Unit;

  constructor(u: UnitLike = 0) {
    this.head = toUnit(u);
  }

  forward(vars) {
    return this.head.forward(vars);
  }

  backward(vars) {
    return this.head.backward(vars);
  }

  toString() {
    return this.head.toString();
  }

  add(a: UnitLike) {
    const u = toUnit(a);
    const tmp = new op.Add(this.head, u);
    this.head = tmp;
  }

  sub(a: UnitLike) {
    const u = toUnit(a);
    const tmp = new op.Sub(this.head, u);
    this.head = tmp;
  }

  mul(a: UnitLike) {
    const u = toUnit(a);
    const tmp = new op.Mul(this.head, u);
    this.head = tmp;
  }

  div(a: UnitLike) {
    const u = toUnit(a);
    const tmp = new op.Div(this.head, u);
    this.head = tmp;
  }

  // TODO

  extend() {
    console.log("TODO");
  }

  simplify() {
  }

  solve(variable: string) {
  }
}

const tmp = new E("a");
tmp.add("b");
const x = new E("b");
x.add(1);
x.mul(tmp);
x.extend();

const ret = x.forward({
  a: 3,
  b: 5
});

console.log(x + " = " + ret);
