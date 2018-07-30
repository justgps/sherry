
exports.getPM25 = async (position) => {
   // pm2.5 data
   var optionz =  {
      uri: 'http://opendata2.epa.gov.tw/AQI.json',
      json: true
   };

   const fetch = require('request-promise');
   try {
      const response = await fetch(optionz);
      if(response) {
         var data = '';
         for(var i = 0; i < response.length; i++) {
            if(response[i].SiteName == position) {
               data = response[i];
               break;
            }
         }
         return data;
      }
      else return ''; 
   } catch(err) {  return err; }
};
