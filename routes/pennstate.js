const request = require('request');
const express = require('express');

const router = express.Router();

router.use(function (req,res,next){
    console.log('Pennstate Router');
    next();
})

//DS018933L is the license
// just change the license number in var myJSONObject ... others i have set to dentist ke options only
//async - UI first - then content - static HTML
//promises - callbacks



router.get('/:lic_id',  function(req, res){
    var lic_id = req.params.lic_id;
    var is_api = req.query.is_api;

    

    var request = require('request');
    var options = {
    'method': 'POST',
    'url': 'https://www.pals.pa.gov/api/Search/SearchForPersonOrFacilty',
    'headers': {
        'Content-Type': 'application/json',
        'Cookie': 'ASP.NET_SessionId=hhsfm1yzsadz0nmcjn45avhk'
    },
    body: JSON.stringify({"OptPersonFacility":"Person","ProfessionID":13,"LicenseTypeId":156,"LicenseNumber":lic_id,"State":"","Country":"ALL","County":null,"IsFacility":0,"PersonId":null,"PageNo":1})

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    var temp  = JSON.parse(response.body);
    var person_Id = temp[0]["PersonId"]
    var license_Id = temp[0]["LicenseId"]

    var request = require('request');
    var options = {
    'method': 'POST',
    'url': 'https://www.pals.pa.gov/api/SearchLoggedIn/GetPersonOrFacilityDetails',
    'headers': {
        'Content-Type': 'application/json',
        'Cookie': 'ASP.NET_SessionId=hhsfm1yzsadz0nmcjn45avhk'
    },
    body: JSON.stringify({"PersonId":person_Id,"LicenseNumber":lic_id,"IsFacility":"0","LicenseId":license_Id})

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);

        var temp1  = JSON.parse(response.body);
        var name = temp1["FirstName"]+temp1["LastName"]
        var status = temp1["Status"]
        var expiry = temp1["ExpiryDate"]
        if (temp1["DisciplinaryActionDetails"].length != 0)
        {
            var disi = "Yes"
        }
        else
        {
            var disi = "No"
        }

        result = {"Name":name,"Status":status,"ExpiryDate":expiry,"DisciplinaryAction" :disi}

        if(is_api == "true"){
            res.send(JSON.stringify(result));
        }
        else{
            res.render("pages/status",{result:JSON.stringify(result)});
        }


    });


    });


});

module.exports = router;