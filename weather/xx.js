const io = require('socket.io-client')("http://localhost:11000");

io.on('connect', (socket) => {
   io.emit('hello', 'world');
   console.log("Connected %s", io.id);
});

io.on('event', function(data){
   console.log("has event data " + data);
});

