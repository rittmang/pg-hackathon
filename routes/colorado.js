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
    var lic = req.params.lic_id
    var lend = lic.length
    var dot = lic.indexOf(".")
    if(dot!=-1)
    {
        var temp_lic =  lic.slice(dot+1,lend)
    }
    else
    {
        temp_lic=lic
    }

    for(var i=0;i<lend;i++)
    {
        if(temp_lic[i]!="0")
        {
            break;
        }
    }
    temp_lic =  temp_lic.slice(i,lend)
    //console.log("temp",lic,temp_lic,i)
    Colorado.getColoradoByLICId(temp_lic, function(err, colorado) {
        if(err || colorado == null){
            console.log(err);
            res.send(404);
        }
        else {
            if (colorado['ProgramAction'] === "") {
                var disc = "No";
            } else {
                var disc = "Yes";
            }


            var result = {
                "Name": colorado['FormattedName'],
                "Status": colorado['LicenseStatusDescription'],
                "ExpiryDate": colorado['LicenseExpirationDate'],
                "DisciplinaryAction": disc
            };
            if (is_api == "true") {
                //var tname = 'Indira';
                res.status(200).send(JSON.stringify(result));
                //, {tname : tname});
            } else {
                res.render('pages/status', {result: JSON.stringify(result)});
            }
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