const express = require('express');
Florida = require('../models/florida');

const router = express.Router();

router.use(function (req,res,next){
    console.log('Florida Router');
    next();
})

router.get('/', function(req,res){
    Florida.getFlorida(function(err, florida) {
        if(err){
            throw err;
        }
        res.json(florida);
    });
});

router.get('/:lic_id', function(req,res){
    var is_api = req.query.is_api;
    var lic = req.params.lic_id
    var lend = lic.length
    var real_lic = lic.slice(2,lend) 

    Florida.getFloridaByLICId(real_lic, function(err, florida) {
        if(err || florida == null){
            res.send(404);
        }
        else {
            var name = florida['firstName'] + " " + florida['middleName'] + " " + florida['lastName'];


            var result = {
                "Name": name,
                "Status": florida['licenseStatusDescription'],
                "ExpiryDate": florida['expireDate'],
                "DisciplinaryAction": florida['boardActionIndicator']
            };
            if (is_api == "true") {
                res.status(200).send(JSON.stringify(result));
            } else {
                res.render('pages/status', {result: JSON.stringify(result)});
            }
        }
        //res.send(texas['LIC_ID'].toString());
    });
});


module.exports = router;