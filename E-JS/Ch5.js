

function greaterThan(n) {
  return function(m){
    return m > n;
  }  
}
let greaterThan10 = greaterThan(10);
// console.log(greaterThan(10)(9))
// console.log(greaterThan(10)(13))

function noisy(f) {
  return function(...nums) {
    console.log('...nums: ', ...nums);
    console.log('nums: ', nums);
    return f(...nums)
  }
}
// console.log(noisy(Math.min)(3, 2, 1));
// → calling with [3, 2, 1]
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

function unless(thisTest, thenThat){
  if(!thisTest) thenThat();
}

// repeat(3, n => {
//   unless(n % 2 === 1, () => console.log(n, " is even"))
// })

let arrays = [[1, 2, 3], [4, 5], [6]];

function flatten(arr) {
  const flattened = arr.reduce((a,b) => {
    return a.concat(b);
  }, [])
  return flattened;
}
// console.log(flatten(arrays))

// → [1, 2, 3, 4, 5, 6]

function loop(start, test, update, body) {
  for(let i=start; test(i); i = update(i)) {
    body(i);
  }
}

// loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

function every(array, test) {
  for(let i=0; i<array.length; i++) {
    if(!test(array[i])) {
      return false
    }
  }
  return true;
}

function some(array, test) {
  for(let i=0; i<array.length; i++) {
    if(test(i)) return true
  }
  return false
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true

