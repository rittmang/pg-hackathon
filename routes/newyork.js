const request = require('request');
const cheerio=require('cheerio');
const express = require('express');

const router = express.Router();

router.use(function (req,res,next){
    console.log('New York Router');
    next();
})

router.get('/:lic_id',  function(req, res){
    var lic_id = req.params.lic_id;
    var param_name = req.query.param_name;
    var is_api = req.query.is_api;
    //050608
    var body = `profcd=50&plicno=${lic_id}`;
    var options = {
        'method': 'POST',
        'url': 'http://www.nysed.gov/COMS/OP001/OPSCR2',
        'headers': {
            'Content-Type': 'text/plain'
        },
        body: body

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        const fs = require('fs');
        fs.writeFile("./test.html", response.body, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        const $ = cheerio.load( response.body);

        var stringEntire = ($("#content_column").text())
        var lines = stringEntire.split('\n');
        for(var i = 0;i < lines.length;i++) {
            //code here using lines[i] which will give you each line
            if (lines[i].search("Name") != -1) {
                nameStr = lines[i]
                var len = nameStr.length
                var name = nameStr.slice(8, len - 1);
                var name_a = name.trimEnd().split(" ");
                console.log("name", name)
            }
            if (lines[i].search("Status") != -1) {
                nameStr = lines[i]
                var len = nameStr.length
                var status = nameStr.slice(11, len - 1);
                console.log("status", status)
            }
            if (lines[i].search("Registered through last day of :") != -1) {
                nameStr = lines[i]
                var len = nameStr.length
                var last_day = nameStr.slice(33, len - 1);
                console.log("Registered through last day of :", last_day)
            }
        }
        name = name_a[0];
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
    });

});

module.exports = router;