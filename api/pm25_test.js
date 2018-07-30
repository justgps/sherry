const x = require('./pm25');

var z = x.getPM25('西屯');

z.then(s => {
   console.log(s);
});
