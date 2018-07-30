const stock = require('./stock');

var s = [2454, 2317, 2002, 2330, 2412];
stock.getStock(s).then(data => {
   console.log(data);
});
