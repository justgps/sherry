/*
*/

const stock = require('./stock');
var url = 'https://script.google.com/macros/s/AKfycbwFEM66Kcbr8YHa7URCqWuz5_-YM20adR8-0lVXvLznilY6DVoC/exec';

async function getStockFromGoogleSheet(url) {
   const fetch = require('request-promise');
   var i, jsonUrl;
   var options = {
      uri: url,
      qs: {
         url: 'https://docs.google.com/spreadsheets/d/1pIPsd95EtZVwyy9R5xLzHOpO2DL8F6YvrWngCFY9khA/edit#gid=0',
         name: '股票',
         startRow: 2
      },
      json: true
   };
   var stocks = [];
   try {
      const response = await fetch(options);
      if(response) {
         return response;
      }
      else return response;
   } catch(err) {  return err; }
}

async function getStock() {
   getStockFromGoogleSheet(url).then(data => {
      if(!data)  return;
      var stocks = data.trim().split(",");
      if(!Array.isArray(stocks) || stocks.length <= 0)  return;
      stock.getStock(stocks).then(info => {
         console.log(info);
      });
   });
}

getStock();

