

function chessboard(size) {
  let board = '';
  for(let i=0; i<size; i++) {
    for(let j=0; j<size; j++) {
      if((i+j) % 2 === 0) {
        board += " ";
      } else {
        board += "#";
      }
    }
    board += "\n"
  }
  return board;
};
// console.log(chessboard(8));

function fizzBuzz(num) {
  for(let i=1; i<=num; i++){
    if(i % 5 === 0 && i % 3 === 0) {
      console.log('FizzBuzz');
    } 
    else if(i % 3 === 0) {
      console.log('Fizz');
    }
    else if(i % 5 === 0) {
      console.log('Buzz');
    }
    else {
      console.log(i)
    }
  }
}
// fizzBuzz(31)

function fizzBuzz2(num) {
  for(let i=0; i<=num; i++) {
    console.log((i % 3 ? '' : 'fizz') + (i % 5 ? '' : 'buzz') || i);
  }
}
fizzBuzz2(16);