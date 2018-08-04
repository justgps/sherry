/*
   get PM 2.5
*/
exports.getPM25 = async (position) => {
   // pm2.5 data
   var optionz =  {
      method: 'GET',
      uri: 'http://localhost/weather/getPM25/' + position,  //http://opendata2.epa.gov.tw/AQI.json',
      json: false
   };

   const fetch = require('request-promise');
   try {
      const response = await fetch(optionz);
      if(response) {
/*
         var data = '';
         for(var i = 0; i < response.length; i++) {
            if(response[i].SiteName == position) {
               data = response[i];
               break;
            }
         }
         return data;
*/
         return response;
      }
      else return ''; 
   } catch(err) {  return err; }
};
