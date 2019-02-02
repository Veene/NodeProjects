let journal = [];

function addEntry(events, squirrel) {
  journal.push({events, squirrel});
}

addEntry(["work", "touched tree", "pizza", "running",
          "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna",
          "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts",
          "beer"], true);

// console.log(journal)

function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}
// console.log(tableFor("pizza", journal))

function range(start, end, step = start>end ? -1 : 1) {
  const arr = [];
  if(step > 0) {
    for(let i=start; i<=end; i+=step){ arr.push(i); }
  } else {
    for(let i=start; i>=end; i+=step){ arr.push(i); }
  }
  return arr;
};
function sum(arr) {
  let total = 0;
  for(let num of arr) { total += num; }
  return total;
}
// console.log(sum(range(10,6)));
// console.log(range(5,8));

function reverseArray(arr) {
  let newArr = [];
  for(let i=arr.length-1; i>=0; i--) { newArr.push(arr[i]) }
  return newArr;
}
function reverseArrayInPlace(arr) {
  for(let i=0; i<Math.floor(arr.length/2); i++) {
    let temp = arr[i];
    arr[i] = arr[arr.length-1-i];
    arr[arr.length-1-i] = temp;
  }
}


// console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
// let arrayValue = [1, 2, 3, 4, 5];
// reverseArrayInPlace(arrayValue);
// console.log(arrayValue);
// → [5, 4, 3, 2, 1]

function arrayToList(nums){
  let list = null;
  for(let i=nums.length-1; i>=0; i--) {
    list = {
      value: nums[i],
      rest: list
    }
  }
  return list;
};

let list = {
  value: 10,
  rest: {
    value: 20,
    rest: {
      value: 30,
      rest: null
    }
  }
};

function listToArray(list) {
  let arr = [];
  for(let key in list) {
    if(typeof list[key] === 'number') {
      arr.push(list[key])
    }
    else if(typeof list[key] === 'object') {
      arr = arr.concat(listToArray(list[key]))
    }
  }
  return arr;
};

function prepend(element, list) {
  return {
    value: element,
    rest: list
  }
};
function nth(list, index) {
  let i = 0;
  let current = list
  while(i < index) {
    current = current.rest;
    i++;
  }
  return current.value
};

function recursiveNth(list, index) {
  if(index === 0) {
    return list.value
  }
  return recursiveNth(list.rest, index-1)
}

// console.log(arrayToList([10, 20, 30]));
// // // → {value: 10, rest: {value: 20, rest: null}}
// console.log(listToArray(arrayToList([10, 20, 30])));
// // // → [10, 20, 30]
// console.log(prepend(10, prepend(20, null)));
// // // → {value: 10, rest: {value: 20, rest: null}}
// console.log(nth(arrayToList([10, 20, 30]), 1));
// // // → 20
// console.log(recursiveNth(arrayToList([10, 20, 30]), 1));
// // // → 20

function deepEqual(obj1, obj2) {
  if(Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  for(let key in obj1) {
    if(typeof obj1[key] === 'object' && typeof obj2[key] === 'object'){
      return deepEqual(obj1[key], obj2[key])
    }
    else if(obj1[key] !== obj2[key]) {
     return false;
    }
  }
  return true
  // if(Object.keys(obj1))
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
//true
console.log(deepEqual(obj, {here: {is: "am"}, object: 2}));
//false