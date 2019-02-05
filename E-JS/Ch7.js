const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null); //null necessary to make a map so it doesnt inherit from object.prototype
  function addEdge(from, to) {
    if(graph[from] == null) { //== null or === undefined
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for(let [from, to] of edges.map(road => road.split('-'))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);
// console.log(roadGraph)

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  //MOVE - method/ on VillageState class. takes 'destination' which is where it's moving. Takes roadGraph built with buildGraph(roads)
  //
  move(destination) {
    if (!roadGraph[this.place].includes(destination)) { //unable to move if destination is not linked to this.place (where the robot is at the time) MUST CHOOSE ANOTHER
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p; //didnt grab it yet
        return {place: destination, address: p.address}; //grabbed so its moving with us
      }).filter(p => p.place != p.address); //filter out ones that are delivered (current place is the place their going to address)
      return new VillageState(destination, parcels);
    }
  }
}
// let first = new VillageState(
//   "Post Office",
//   [{place: "Post Office", address: "Alice's House"}]
// );
// let next = first.move("Alice's House");

// console.log(next.place);
// // → Alice's House
// console.log(next.parcels);
// // → []
// console.log(first.place);
// // → Post Office

function runRobot(state, robot, memory) { //state = parcel state and where robot is
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    //if action has no memory param, then it only returns direction to move
    let action = robot(state, memory);
    state = state.move(action.direction); //new state with move updates everything
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) { //will need to be given state to produce return result
  return {direction: randomPick(roadGraph[state.place])};
}
//village.random creates random array of parcel objects NOTHING to do with directions
VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  console.log('parcels: ', parcels)
  return new VillageState("Post Office", parcels); //KEY RETURN for state
};

// runRobot(VillageState.random(), randomRobot); //not using 3rd param memory
// → Moved to Marketplace
// → Moved to Town Hall
// → …
// → Done in 63 turns
// runRobotAnimation(VillageState.random(), randomRobot);
const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];
function routeRobot(state, memory) {
  if (memory.length == 0) { //if route done, re-implement full route
    memory = mailRoute; //so constantly loop until state.parcels.length = 0
  }
  return {direction: memory[0], memory: memory.slice(1)};
}
// runRobot(VillageState.random(), routeRobot, []); //routeRobot always gives next route

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place); //one of the paths from AT match TO, so one path away
      if (!work.some(w => w.at == place)) {//if no object in work has at from the places linked to graph[at]
        work.push({at: place, route: route.concat(place)}); //make sure each AT has an object with routes how to get there
      }
    }
  }
}
//robot gets the new state everytime runRobot loops
function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) { //we pass [] in the newest runRobot below
    let parcel = parcels[0]; //analyze first parcel in list
    if (parcel.place != place) { //we havent picked it up, lets go
      route = findRoute(roadGraph, place, parcel.place);
    } else { //we got it, lets now route for the drop off
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
// runRobot(VillageState.random(), goalOrientedRobot, []);

function compareRobots(robot1, memory1, robot2, memory2) {
  const state = VillageState.random();
  runRobot(state, robot1, memory1);
  runRobot(state, robot2, memory2)
}

// compareRobots(routeRobot, [], goalOrientedRobot, []);

class PGroup {
  constructor(data) {
    this.data = data;
  }
  add(value){
    if(this.has(value)) return 'already has value';
    return new PGroup(this.data.concat(value));
  }
  delete(value) {
    if(this.has(value)) {
      return new PGroup(this.data.filter(data => data !== value));
    } else {
      return 'this value doesnt exist';
    }
  }
  has(value) {
    return this.data.indexOf(value) !== -1 ? true : false;
  }
}
PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
console.log(a)
let ab = a.add("b");
console.log(ab)
let b = ab.delete("a");
console.log(b)

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false