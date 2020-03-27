var express = require('express');
var router = express.Router();
var fs  = require('fs');
/* GET users listing. */

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

router.get('/', function(req, res, next) {
  let results = []
  fs.readFile("mno.json", "utf8", function(err, data){
    if(err) throw  err
     results  = JSON.parse(data)
     params  = req.query

     if ('mcc' in params) {
        results = results.filter(result => result.mcc === params.mcc )

     }
     if('mnc' in params) {
         results = results.filter(result => result.mnc === params.mnc)
     }

     if ('country' in params) {
         results = results.filter(result => result.country === params.country.capitalize())
     }
     res.send(results)
  })
  // res.send(results);
});

module.exports = router;
