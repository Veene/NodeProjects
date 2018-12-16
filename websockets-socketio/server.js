// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);

app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

//THIS IS JUST TO TEST EMITS OF HI
setInterval(() => {
    io.sockets.emit('message', 'hi!');
}, 1000);

var players = {};

io.on('connection', function(socket) {
  console.log('new user connected: ', socket.id)
  //when client socket starts up, it emits 'new player' and we use its socket.id to place it at starting pos x:300, y:300
  socket.on('new player', function() {
    players[socket.id] = {
      x: 300,
      y: 300
    };
  });
  //receives movement emit 60 times a second from client
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    //data in this case is the movement object (movement.up = false||true, movement.down = false|true etc)
    if (data.left) {
      //players[socket.id].x -= 5;
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  });
  socket.on('disconnect', () => {
      console.log('user disconnected: ', socket.id);
      delete players[socket.id]
      console.log('removed players from object')
  })
});

setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);