const express = require('express');
Massachusetts = require('../models/massachusetts');

const router = express.Router();

router.use(function (req,res,next){
    console.log('Massachusetts Router');
    next();
})

router.get('/', function(req,res){
    Massachusetts.getMass(function(err, mass) {
        if(err){
            throw err;
        }
        res.json(mass);
    });
});

router.get('/:lic_id', function(req,res){
    var is_api = req.query.is_api;
    Massachusetts.getMassByLICId(req.params.lic_id, function(err, mass) {
        if(err){
            throw err;
        }
        var name = mass['first_name'] + " " + mass['middle_name'] + " " + mass['last_name'];
        var result = [name, mass['license_status_name'], mass['expiration_date'], "No" ];
        if(is_api == "true"){
            res.send(JSON.stringify(result));
        }
        else{
            res.render('pages/status', {result: JSON.stringify(result)});
        }

        //res.send(texas['LIC_ID'].toString());
    });
});



/*router.post('/', function(req,res){
    var book = req.body;
    Book.addBook(book, function(err, book) {
        if(err){
            throw err;
        }
        res.json(book);
    });
});*/

module.exports = router;