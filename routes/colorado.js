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
    var param_name = req.query.param_name;
    var is_api = req.query.is_api;
    Colorado.getColoradoByLICId(req.params.lic_id, function(err, colorado) {
        if(err){
            throw err;
        }
        var name = colorado['FormattedName']
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