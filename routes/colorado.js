const express = require('express');
Colorado = require('../models/colorado');

const router = express.Router();

router.use(function (req,res,next){
    console.log('Colorado Router');
    next();
})

router.get('/', function(req,res){
    console.log("In get function");
    Colorado.getColorado(function(err, colorado) {
        console.log("before error");
        if(err){
            throw err;
        }
        console.log("No error");
        res.json(colorado);
        console.log("Mai kaha");
    });
});

router.get('/:lic_id', function(req,res){
    var is_api = req.query.is_api;
    Colorado.getColoradoByLICId(req.params.lic_id, function(err, colorado) {
        if(err){
            throw err;
        }
        if(colorado['ProgramAction'] === ""){
            var disc = "No";
        }
        else{
            var disc = "Yes";
        }

        
        var result = {"Name":colorado['FormattedName'],"Status":colorado['LicenseExpirationDate'],"ExpiryDate":colorado['LicenseStatusDescription'],"DisciplinaryAction":disc };
        if(is_api == "true"){
            //var tname = 'Indira';
            res.send(JSON.stringify(result));
            //, {tname : tname});
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