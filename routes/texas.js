const express = require('express');
Texas = require('../models/texas');

const router = express.Router();

router.use(function (req,res,next){
    console.log('Texas Router');
    next();
})

router.get('/', function(req,res){
    console.log("In get function");
    Texas.getTexas(function(err, texas) {
        console.log("before error");
        if(err){
            throw err;
        }
        console.log("No error");
        res.json(texas);
        console.log("Mai kaha");
    });
});

router.get('/:lic_id', function(req,res){
    var is_api = req.query.is_api;
    Texas.getTexasByLICId(req.params.lic_id, function(err, texas) {
        if(err || texas == null){
            console.log(err);
            res.send(404);
        }
        else {
            var name = texas['FIRST_NME'] + " " + texas['MIDDLE_NME'] + " " + texas['LAST_NME'];
            var result = {
                "Name": name,
                "Status": texas['LIC_STA_DESC'],
                "ExpiryDate": texas['LIC_EXPR_DTE'],
                "DisciplinaryAction": texas['DISC_ACTION']
            };
            if (is_api == "true") {
                res.status(200).send(JSON.stringify(result));
            } else {
                res.render("pages/status", {result: JSON.stringify(result)});
            }
        }
        //res.send(texas['LIC_ID'].toString());
    });
});



module.exports = router;