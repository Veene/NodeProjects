let empty = {};
// console.log(empty.toString);
// // → function toString(){…}
// console.log(empty.toString());
// // → [object Object]

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
// killerRabbit.speak("SKREEEE!");
// → The killer rabbit says 'SKREEEE!'

function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

const blueRabbit = makeRabbit('blue');

function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit("weird");

// console.log(blueRabbit.type)
// blueRabbit.speak('woobooga')

// console.log(Object.getPrototypeOf(Rabbit) ==
//             Function.prototype);
// // → true
// console.log(Object.getPrototypeOf(weirdRabbit) ==
//             Rabbit.prototype);
// // → true
// console.log(Rabbit.prototype)

// console.log("toString" in Object.create({data:'test'}));
// → false

// let okIterator = "OK"[Symbol.iterator]();
// console.log(okIterator.next());
// // → {value: "O", done: false}
// console.log(okIterator.next());
// // → {value: "K", done: false}
// console.log(okIterator.next());
// // → {value: undefined, done: true}

let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
};

// console.log(varyingSize.size);
// // → 73

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(vec){
    return new Vec(this.x + vec.x, this.y + vec.y)
  }
  minus(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y)
  }
  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}
// console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// // → Vec{x: 3, y: 5}
// console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// // → Vec{x: -1, y: -1}
// console.log(new Vec(3, 4).length);
// // → 5

class Group {
  constructor() {
    this.data = [];
  }
  add(value){
    if(this.has(value)) return 'already has value';
    this.data.push(value);
  }
  delete(value) {
    if(this.has(value)) {
      this.data.splice(this.data.indexOf(value), 1)
    }
  }
  has(value) {
    return this.data.indexOf(value) !== -1 ? true : false;
  }
  static from(arr) {
    let group = new Group();
    for(let i=0; i<arr.length; i++) {
      group.add(arr[i])
    }
    return group;
  }
  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(allOfGroupClass) {
    this.allOfGroupClass = allOfGroupClass;
    this.index = 0;
  }
  next() {
    if(this.index === this.allOfGroupClass.data.length) return { done: true };
    let value = this.allOfGroupClass.data[this.index]
    this.index++;
    return { value, done: false }
  }
}

let group = Group.from([10, 20]);

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c

let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call
// console.log(map.hasOwnProperty("one"));
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true