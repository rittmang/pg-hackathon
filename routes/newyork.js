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
    var is_api = req.query.is_api;
    if (lic_id.length != 6){
        res.send(404);
        console.log("Invalid License New York");
    }
    //050608
    else {
        var body = `profcd=50&plicno=${lic_id}`;
        var options = {
            'method': 'POST',
            'url': 'http://www.nysed.gov/COMS/OP001/OPSCR2',
            'headers': {
                'Content-Type': 'text/plain'
            },
            body: body

        };
        try {
            request(options, function (error, response) {
                console.log(response.body)
                if (error) throw new Error(error);
                const fs = require('fs');
                /*fs.writeFile("./test.html", response.body, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });*/
                const $ = cheerio.load(response.body);

                var stringEntire = ($("#content_column").text())
                var lines = stringEntire.split('\n');
                for (var i = 0; i < lines.length; i++) {
                    //code here using lines[i] which will give you each line
                    if (lines[i].search("Name") != -1) {
                        nameStr = lines[i]
                        var len = nameStr.length
                        var name = nameStr.slice(8, len - 1);
                        name.trim()
                        console.log("name", name)
                    }
                    if (lines[i].search("Status") != -1) {
                        nameStr = lines[i]
                        var len = nameStr.length
                        var status = nameStr.slice(11, len - 1);
                        status.trim()
                        console.log("status", status)
                    }
                    if (lines[i].search("Registered through last day of :") != -1) {
                        nameStr = lines[i]
                        var len = nameStr.length
                        var last_day = nameStr.slice(33, len - 1);
                        last_day.trim()
                        console.log("Registered through last day of :", last_day)
                    }
                }
                if (name === undefined) {
                    res.send(404);
                    console.log("Invalid License New York");
                } else {
                    //Code for disi

                    if (name[0].toLowerCase() == 'i' || name[0].toLowerCase() == "j") {
                        var url = 'http://www.op.nysed.gov/opd/randxij.htm'
                    } else if (name[0].toLowerCase() == 'u' || name[0].toLowerCase() == "v") {
                        var url = 'http://www.op.nysed.gov/opd/randxuv.htm'
                    } else if (name[0].toLowerCase() == 'q' || name[0].toLowerCase() == "r") {
                        var url = 'http://www.op.nysed.gov/opd/randxqr.htm'
                    } else if (name[0].toLowerCase() == "w" || name[0].toLowerCase() == "x" || name[0].toLowerCase() == 'y' || name[0].toLowerCase() == "z") {
                        var url = 'http://www.op.nysed.gov/opd/randxwz.htm'
                    } else {
                        var url = 'http://www.op.nysed.gov/opd/randx' + name[0].toLowerCase() + name[0].toLowerCase() + '.htm'
                    }


                    console.log(url)
                    var request = require('request');
                    var options = {
                        'method': 'GET',
                        'url': url,
                        'headers': {}
                    };
                    request(options, function (error, response) {
                        if (error) throw new Error(error);
                        fs.writeFile("./test.html", response.body, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            console.log("The file was saved!");
                        });

                        var n = response.body.search(lic_id);
                        var dici = ""
                        if (n == -1) {
                            dici = "No"
                        } else {
                            dici = "Yes"
                        }
                        //code end for disi

                        var result = {
                            "Name": name,
                            "Status": status,
                            "ExpiryDate": last_day,
                            "DisciplinaryAction": dici
                        };
                        if (is_api == "true") {
                            res.status(200).send(JSON.stringify(result));
                        } else {
                            res.render('pages/status', {result: JSON.stringify(result)});
                        }
                    });
                }
            });
        } catch (error) {
            console.log(error);
            res.status(404);
        }
    }
});


module.exports = router;