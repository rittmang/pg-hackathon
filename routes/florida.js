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
    Florida.getFloridaByLICId(req.params.lic_id, function(err, florida) {
        if(err || florida == null){
            res.status(500);
            lic_id = req.params.lic_id;
            res.render('pages/not_found', {title: 'License Not Found', lic_id: lic_id });
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
                res.send(JSON.stringify(result));
            } else {
                res.render('pages/status', {result: JSON.stringify(result)});
            }
        }
        //res.send(texas['LIC_ID'].toString());
    });
});


module.exports = router;