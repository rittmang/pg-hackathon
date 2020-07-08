const request = require('request');
const express = require('express');
const cheerio=require('cheerio');
var fs = require('fs');

const router = express.Router();
router.use(function (req,res,next){
    console.log('Oregon Router');
    next();
})

router.get('/:lic_id',  function(req, res){
    var lic_id = req.params.lic_id;
    var is_api = req.query.is_api;

    var options = {
    'method': 'GET',
    'url': 'https://lookup.oregondentistry.org/searchdir.asp?searchby=licno&searchfor='+lic_id+'&stateselect=none&lictype=Dentist&Submit=Search',
    'headers': {
        'Content-Type': 'text/plain',
        'Cookie': 'ASPSESSIONIDQWBSACDC=PIMLMDNCFAOKODNDDAICFPOM'
    },
    //D8049
    //D6467


};
request(options, function (error, response) {
  if (error) throw new Error(error);
  fs.writeFile('test.html', response.body, function (err) {
    //console.log('Hello World > helloworld.txt');
});

    var $ = cheerio.load(response.body);
    var name = $('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td:nth-child(2)').text()
    var status = $('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5) > td:nth-child(2)').text()
    var expDate = $('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(6) > td:nth-child(2)').text()
    
    var dis = $('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(9) > td:nth-child(2)').text()

    if(dis=="There has been no discipline on this license.")
    {
        var disi = "No"
    }
    else
    {
        var disi = "Yes"
    }
    var result = {"Name": name, "Status": status, "ExpiryDate": expDate, "DisciplinaryAction": disi}

    if (is_api == "true") {
        res.status(200).send(JSON.stringify(result));
    } else {
        res.render('pages/status', {result: JSON.stringify(result)});
    }
});


});

module.exports = router;