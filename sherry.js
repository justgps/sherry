const linebot = require('linebot');
const rq = require('request-promise');
const app = require('express')();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const pm = require('./api/pm25.js');
const lineini = require('./config/lineini.js');
var bot = linebot(lineini);
var io = require('./socketserver');

const request = require('request');
const cheerio = require('cheerio');

const port = process.env.PORT || 11000;

function getSign(event) {
   var body = new Buffer(JSON.stringify(event.body), 'utf8');
   var hash = crypto.createHmac('sha256', botInfos.channelSecret).update(body).digest('base64');
   return hash
}

app.post('/', bot.parser());
app.get('/', function(req, res) { res.sendStatus(200); });

var timer2;

function _japan(userID) {
  clearTimeout(timer2);
  request({
    url: "http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm",
    method: "GET"
  }, function(error, response, body) {
    if(error || !body) {
      clearTimeout(timer2);
      return;
    } 
    else {
      var $ = cheerio.load(body);
      var target = $(".rate-content-sight.text-right.print_hide");
      console.log(target[15].children[0].data);
      jp = target[15].children[0].data;
      if (jp < 4) {  
        bot.push(userID, '現在日幣 ' + jp + '，該買啦！');
      }
      timer2 = setInterval("_japan('" + userID + "')", 120000);
    }
  });
}

// event.source.userId
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
         _japan(event.source.userId);
/*
         setTimeout(function(){
            var userId = event.source.userId;
            var sendMsg = 'Hello World.';
            bot.push(userId,sendMsg);
            console.log('send: '+sendMsg);
         },5000);
*/

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
