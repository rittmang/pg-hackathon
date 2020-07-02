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
    var param_name = req.query.param_name;
    var is_api = req.query.is_api;
    var myJSONObject = {"OptPersonFacility":"Person","ProfessionID":13,"LicenseTypeId":156,"LicenseNumber":lic_id,"State":"","Country":"ALL","County": "","IsFacility":0,"PersonId":"","PageNo":1};
    var options =
        {
            url: "https://www.pals.pa.gov/api/Search/SearchForPersonOrFacilty",
            method: "POST",
            json: true,   // <--Very important!!!
            body: myJSONObject
        };
    request(options, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var dict = body[0];
            //console.log(dict)
            console.log(dict["FirstName"], dict["MiddleName"], dict["LastName"])
            console.log(dict["Status"])
            console.log(dict["DisciplinaryAction"])
            var name = dict["FirstName"];
            if(is_api == "true"){
                if(param_name == name){
                    //var tname = 'Indira';
                    res.send('Verified');
                    //, {tname : tname});
                }
                else{
                    res.send("Error");
                }
            }
            else{
                if(param_name == name){
                    //var tname = 'Indira';
                    res.render('pages/status');
                    //, {tname : tname});
                }
                else{
                    res.send("uh oh");
                }
            }

        }
    });

});

module.exports = router;