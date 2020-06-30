const request = require('request');
const express = require('express');

const router = express.Router();

router.use(function (req,res,next){
    console.log('Nevada Router');
    next();
})
//0492 test license - name - john

router.get('/:lic_id',  function(req, res){
    var lic_id = req.params.lic_id;
    var fname = req.query.fname;
    var options = {
        'method': 'POST',
        'url': 'https://ws.nvdental.org/api/Individual/IndividualVerifyLicenseDental',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"sortType":"LicenseNumber","sortOrder":"asc","currentPage":1,"totalRecords":82,"pageSize":10,"maxSize":5,"Data":{"LastName":"","FirstName":"","LicenseNumber":lic_id}})

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        var temp  = JSON.parse(response.body);
        user_id = temp["PagerVM"]["Records"][0]["IndividualId"];
        console.log(temp["PagerVM"]["Records"][0]["FirstName"],temp["PagerVM"]["Records"][0]["MiddleName"],temp["PagerVM"]["Records"][0]["LastName"])
        console.log(temp["PagerVM"]["Records"][0]["LicenseStatusTypeName"])
        console.log(temp["PagerVM"]["Records"][0]["ExpirationDate"])
        if(fname == temp["PagerVM"]["Records"][0]["FirstName"]){
            res.redirect("/status");
        }
        else{
            res.send("Nahi re. Nahi jamla.");
        }

    });
});

module.exports = router;