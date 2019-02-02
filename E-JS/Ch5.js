

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

