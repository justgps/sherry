const app = require('express')();
const pm = require('./api/pm25.js');

const port = process.env.PORT || 11001;

app.get('/getpm/:position', (req, res) => {
   if(!req.params.position) {
      res.send("找不到" + req.params.position + "的相關資訊");
   }
   else {
      var s = req.params.position.toString().toLowerCase();
      pm.getPM25(s).then(t => {
         if(t) {
            res.send(t.County + t.SiteName + '\nPM2.5:' + t["PM2.5_AVG"] + '\nStatus: ' + t.Status);
         }
         else res.send(req.params.position);
      });
   }
});

app.get('/', function(req, res) { console.log("OK"); res.sendStatus(200); });

var srv = app.listen(port, function() {
   console.log('Sherry Weather API is running at: ' + port);
});

const io = require('socket.io-client')("http://localhost:11000");

io.on('connect', (socket) => {
   io.emit('hello', 'world');
   console.log("Connected %s", io.id);
});

// e.g. kill
process.on('SIGTERM', function() {
   console.log("\nClosing Gracefully");
   srv.close();
   process.exit();
});

//e.g. Ctrl + C 
process.on('SIGINT', function() {
   console.log("\nClosing Gracefully");
   srv.close();
   process.exit();
});

