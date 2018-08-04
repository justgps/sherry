/*
   base url: www.tse.com.tw/exchangeReport/STOCKDAY?response=json&date=20170621&stockNo=2330&=1498059436321
   description: Get stock infotmations from TWSE
   date:2018-08-03
   Chih-Han Liu
*/
const fetch = require('request-promise');

// get today's date string
function getDayString() {
   var date = new Date();
   var m = date.getMonth() + 1;
   var d = date.getDate();

   if(m < 10)  m = '0' + m;
   if(d < 10)  d = '0' + d;
   return date.getFullYear() + '' + m + '' + d;
}

async function sheet(stock) {
   var options = {
      uri: 'https://script.google.com/macros/s/AKfycbwAO6vtj4oFOl7SCotzrho2S4lL83ZAwC0PyqhrHFisGep8Nl1Q/exec',
      qs: {
         url: 'https://docs.google.com/spreadsheets/d/1pIPsd95EtZVwyy9R5xLzHOpO2DL8F6YvrWngCFY9khA/edit#gid=0',
         name: '股票',
         startRow: 2,
         stockNo: stock.stockNo,
         price: stock.price
      },
      json: true
   };
   try {
      await fetch(options);
   } catch(err) {  return err; }
   return true;
}

exports.getStock = async (stock) => {
   var i, jsonUrl;
   var options = {
      method: 'GET',
      uri: '',
      json: true,
      headers:{
         'User-Agent': 'OOP'
      }
   };
   var stocks = [];
   for(i = 0; i < stock.length; i++) {
      stockNo = stock[i];
      options.uri = "http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=" +
                    getDayString() + "&stockNo=" + stockNo;
      try {
         const response = await fetch(options);
         if(response && response.stat == "OK") {
            var title = response.title.split(' ');
            var data = response.data[response.data.length - 1];
            stk = { stockNo: title[1], name: title[2], price: data[data.length - 3] };
            stocks.push(stk);
            sheet(stk);
         }
         else console.log(stockNo + " fetch error.");
      } catch(err) {  return ''; }
   }
   return stocks;
};
