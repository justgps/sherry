const linebot = require('linebot');
const rq = require('request-promise');
const app = require('express')();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const pm = require('./api/pm25.js');
const lineini = require('./config/lineini.js');
var bot = linebot(lineini);
var io = require('./socketserver');

const port = process.env.PORT || 11000;

function getSign(event) {
   var body = new Buffer(JSON.stringify(event.body), 'utf8');
   var hash = crypto.createHmac('sha256', botInfos.channelSecret).update(body).digest('base64');
   return hash
}

app.post('/', bot.parser());
app.get('/', function(req, res) { res.sendStatus(200); });

bot.on('message', function(event) {
   switch(event.message.type) {
      case 'text':
         var s = event.message.text.toLowerCase();
         pm.getPM25(s).then(t => {
            if(t) {
               event.reply(t.County + t.SiteName +
                  '\nPM2.5:' + t["PM2.5_AVG"] + 
                   '\nStatus: ' + t.Status);
            }
            else event.reply("不知道" + event.message.text + "是什麼意思");
         });
         break;
      case 'image':
         break;
      case 'video':
         break;
      case 'location':
         break;
      case 'sticker': // 
         break;
      default:
         break;
   }
});

var srv = app.listen(port, function() {
   console.log('Sherry AI is running at: ' + port);
});
io.start(srv, bot);

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
