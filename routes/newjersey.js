const express = require('express');
Newjersey = require('../models/newjersey');

const router = express.Router();

router.use(function (req,res,next){
    console.log('NewJersey Router');
    next();
})

router.get('/', function(req,res){
    Newjersey.getNewJersey(function(err, nj) {
        if(err){
            throw err;
        }
        res.json(nj);
    });
});

router.get('/:lic_id', function(req,res){
    var is_api = req.query.is_api;
    Newjersey.getNJByLICId(req.params.lic_id, function(err, nj) {
        if(err){
            throw err;
        }
        var name = nj['first_name'] + " " + nj['middle_name'] + " " + nj['last_name'];
        var result = [name, nj['license_status_name'], nj['expiration_date'], "No" ];
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