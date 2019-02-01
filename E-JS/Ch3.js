const minFunction = function(num1, num2) {
  return num1 < num2 ? num1 : num2;
};

// console.log(minFunction(4,5))
// console.log(minFunction(211,158))

const isEven = (num) => {
  if(num < 0) return undefined;
  if(num === 0) return true;
  if(num === 1) return false;
  return isEven(num-2)
};

// console.log(isEven(50));
// console.log(isEven(75));
// console.log(isEven(-1));

function countChar(str, letter) {
  let count = 0;
  for(let i=0; i<str.length; i++) {
    if(str[i] === letter){
      count++;
    }
  }
  return count;
};

console.log(countChar("BBC", "B"));
console.log(countChar("kakkerlak", 'k'));
