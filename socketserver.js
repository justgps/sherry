
exports.start = (http, bot) => {
   const io = require('socket.io')(http);
   console.log("Socket.io Server...OK.");

   io.on('connection', (socket) => {
      console.log("A client connected.");
      socket.on('disconnect', (reason) => {
          console.log("Client disconnect...%s", reason);
      });
   });

}; 
