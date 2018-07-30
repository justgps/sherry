/*
   base url: www.tse.com.tw/exchangeReport/STOCKDAY?response=json&date=20170621&stockNo=2330&=1498059436321
*/

// get today's date string
function getDayString() {
   var date = new Date();
   var m = date.getMonth() + 1;
   var d = date.getDate();

   if(m < 10)  m = '0' + m;
   if(d < 10)  d = '0' + d;
   return date.getFullYear() + '' + m + '' + d;
}

exports.getStock = async (stock) => {
   const fetch = require('request-promise');
   var i, jsonUrl;
   var options = {
      uri: '', 
      json: true
   };
   var stocks = [];
   for(i = 0; i < stock.length; i++) {
      stockNo = stock[i];
      options.uri = "http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=" + 
                    getDayString() + "&stockNo=" + stockNo;
      try {
         const response = await fetch(options);
         if(response.stat == "OK") {
            var title = response.title.split(' ');
            var data = response.data[response.data.length - 1];
            stk = { stockNo: title[1], name: title[2], price: data[data.length - 3] };
            stocks.push(stk);
         }
      } catch(err) {  return err; }
      sheet();
   }
   return stocks;
};
