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
    console.log(lic_id.length);
    var param_name = req.query.param_name;
    var is_api = req.query.is_api;
    if(lic_id.length != 4){
        res.send(404);
    }
    else {
        var options = {
            'method': 'POST',
            'url': 'https://ws.nvdental.org/api/Individual/IndividualVerifyLicenseDental',
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "sortType": "LicenseNumber",
                "sortOrder": "asc",
                "currentPage": 1,
                "totalRecords": 82,
                "pageSize": 10,
                "maxSize": 5,
                "Data": {"LastName": "", "FirstName": "", "LicenseNumber": lic_id}
            })

        };
        try {
            request(options, function (error, response) {
                var temp = JSON.parse(response.body);
                if (error|| temp["Status"] == false) {
                    console.log(error);
                    res.send(404);
                }
                //console.log(response.body);
                else {
                    console.log(response.body);
                    user_id = temp["PagerVM"]["Records"][0]["IndividualId"];

                    var options = {
                        'method': 'GET',
                        'url': 'https://ws.nvdental.org/api/Individual/VerifyLicenseSearchBYIndividualId?IndividualId=' + user_id,
                        'headers': {
                            'Content-Type': 'application/json'
                        },
                    };

                    request(options, function (error, response) {
                        if (error) {
                            console.log(error);
                            res.send(404);
                        }//console.log(response.body);
                        else {
                            var temp1 = JSON.parse(response.body);
                            var disci = ""
                            //console.log(temp1["lstVerifyLicenseSearchResponse"][0]["FirstName"],temp1["lstVerifyLicenseSearchResponse"][0]["LastName"]);
                            //console.log(temp1["lstVerifyLicenseSearchResponse"][0]["LicenseStatusTypeName"]);
                            //console.log(temp1["lstVerifyLicenseSearchResponse"][0]["ExpirationDate"]);
                            //console.log(temp1["lstVerifyLicenseSearchResponse"][0]["MalpracticeList"].length);

                            if (temp1["lstVerifyLicenseSearchResponse"][0]["MalpracticeList"].length != 0) {
                                //temp1["lstVerifyLicenseSearchResponse"][0]["MalpracticeList"][0]["ActionType"] != null
                                disci = "Yes"

                            } else {
                                disci = "No"
                            }

                            var name = temp1["lstVerifyLicenseSearchResponse"][0]["FirstName"] + temp1["lstVerifyLicenseSearchResponse"][0]["LastName"]
                            var result = {
                                "Name": name,
                                "Status": temp1["lstVerifyLicenseSearchResponse"][0]["LicenseStatusTypeName"],
                                "ExpiryDate": temp1["lstVerifyLicenseSearchResponse"][0]["ExpirationDate"],
                                "DisciplinaryAction": disci
                            }

                            if (is_api == "true") {
                                res.status(200).send(JSON.stringify(result));
                            } else {
                                res.render("pages/status", {result: JSON.stringify(result)})
                            }
                        }
                    });
                }
            });
        } catch (error) {
            console.log(error);
            res.send(404);
            var state = "Nevada"
            res.render('pages/not_found', {title: 'License Not Found', lic_id: lic_id, state: state});
        }
    }
});

module.exports = router;