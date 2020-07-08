const express = require('express');
OIG = require('../models/oig');

const router = express.Router();

router.use(function (req,res,next){
    console.log('OIG Router');
    next();
})

/*
router.get('/', function(req,res){
    OIG.getOIG(function(err, oig) {
        if(err){
            throw err;
        }
        res.json(oig);
    });
});*/

router.get('/', function(req,res){
    var is_api = req.query.is_api;
    var first_name = req.query.first_name;
    var last_name = req.query.last_name;
    //var real_lic = lic.slice(2,lend)

    OIG.getOIGByFullName(first_name,last_name, function(err, oig) {
        if(err){
            res.send(404);
        }
        else if(oig == null){
            result = {"Result" : "CLEAN"};
            if (is_api == "true") {
                res.status(200).send(JSON.stringify(result));
            } else {
                res.render('pages/status', {result: JSON.stringify(result)});
            }
        }
        else {
            result = {"Result" : "REVIEW"};
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