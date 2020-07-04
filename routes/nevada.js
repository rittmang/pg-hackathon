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
    var param_name = req.query.param_name;
    var is_api = req.query.is_api;
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
        //console.log(response.body);
        var temp  = JSON.parse(response.body);
        user_id = temp["PagerVM"]["Records"][0]["IndividualId"];
        
        var options = {
            'method': 'GET',
            'url': 'https://ws.nvdental.org/api/Individual/VerifyLicenseSearchBYIndividualId?IndividualId='+user_id,
            'headers': {
              'Content-Type': 'application/json'
            },
          };
      
          request(options, function (error, response) {
            if (error) throw new Error(error);
              //console.log(response.body);
              var temp1 = JSON.parse(response.body);
              var disci = ""
              //console.log(temp1["lstVerifyLicenseSearchResponse"][0]["FirstName"],temp1["lstVerifyLicenseSearchResponse"][0]["LastName"]);
              //console.log(temp1["lstVerifyLicenseSearchResponse"][0]["LicenseStatusTypeName"]);
              //console.log(temp1["lstVerifyLicenseSearchResponse"][0]["ExpirationDate"]);
              //console.log(temp1["lstVerifyLicenseSearchResponse"][0]["MalpracticeList"].length);
              
              if (temp1["lstVerifyLicenseSearchResponse"][0]["MalpracticeList"].length != 0)
              {
                //temp1["lstVerifyLicenseSearchResponse"][0]["MalpracticeList"][0]["ActionType"] != null
                disci = "Yes"

              }
              else
              {
                disci = "No"
              }
      
              var name = temp1["lstVerifyLicenseSearchResponse"][0]["FirstName"] + temp1["lstVerifyLicenseSearchResponse"][0]["LastName"]
              var result = [name,temp1["lstVerifyLicenseSearchResponse"][0]["LicenseStatusTypeName"],temp1["lstVerifyLicenseSearchResponse"][0]["ExpirationDate"],disci]
              if(is_api == "true"){
                  res.send(JSON.stringify(result));
              }
              else{
                  res.render("pages/status", {result: JSON.stringify(result)})
              }
          });
    });
});

module.exports = router;