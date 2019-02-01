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


