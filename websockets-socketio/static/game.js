let socket = io();

//listening for messages from the server
socket.on('message', (data) => {
    console.log(data)
})

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
}
document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 65: // A
        movement.left = true;
        break;
      case 87: // W
        movement.up = true;
        break;
      case 68: // D
        movement.right = true;
        break;
      case 83: // S
        movement.down = true;
        break;
    }
});
document.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
      case 65: // A
        movement.left = false;
        break;
      case 87: // W
        movement.up = false;
        break;
      case 68: // D
        movement.right = false;
        break;
      case 83: // S
        movement.down = false;
        break;
    }
});
//when game.js client loads, it emits new player, which will be listened to with server
socket.emit('new player');
// each client will continuously emit movement, 60/second to the server
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);