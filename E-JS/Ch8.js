function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}

// try {
//   console.log("You see", look());
// } catch (error) {
//   console.log("Something went wrong: " + error);
// }

class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else if(typeof a === 'string' || typeof b === 'string') {
    throw new Error('oh god');
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } 
  catch (error) {
    if(error instanceof MultiplicatorUnitFailure) {
      console.log('80% fail rate, will try again');
      return reliableMultiply(a,b);
    } else {
      console.log('Something went wrong ', error);
      throw new Error('error msg from john');
    }
  }
}

// console.log(reliableMultiply(9, 9));
// → 64

//-----------------------------------------------------/////////////////////////
const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
  if(box.locked) {
    box.unlock();
    body();
    console.log(box.content);
  }
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
} finally {
  box.lock()
}
console.log(box.locked);
// → true