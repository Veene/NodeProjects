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

