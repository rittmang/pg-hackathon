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
    Colorado.getColoradoByLICId(req.params.lic_id, function(err, colorado) {
        if(err){
            throw err;
        }
        var name = req.query.full_name;
        if(colorado['FormattedName'] === name){
            return res.redirect("/status");
        }
        res.send("NUHUH");
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