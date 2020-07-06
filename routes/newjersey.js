const express = require('express');
Newjersey = require('../models/newjersey');
var request = require('request');

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
        if(err || nj == null){
            res.status(500);
            lic_id = req.params.lic_id;
            res.render('pages/not_found', {title: 'License Not Found', lic_id: lic_id });
        }
        else {
            var name = nj['first_name'] + " " + nj['middle_name'] + " " + nj['last_name'];

            //Start dici code

            var options = {
                'method': 'POST',
                'url': 'https://www.njconsumeraffairs.gov/_vti_bin/lists.asmx\n',
                'headers': {
                    'accept': ' application/xml, text/xml, */*; q=0.01',
                    'accept-language': ' en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
                    'content-length': ' 1580',
                    'content-type': ' text/xml; charset="UTF-8"',
                    'origin': ' https://www.njconsumeraffairs.gov',
                    'referer': ' https://www.njconsumeraffairs.gov/den/Pages/actions.aspx',
                    'sec-fetch-dest': ' empty',
                    'sec-fetch-mode': ' cors',
                    'sec-fetch-site': ' same-origin',
                    'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
                    'x-requested-with': ' XMLHttpRequest'
                },
                body: "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'>                 <soapenv:Body>                      <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'>                         <listName>Actions</listName>                         <query>                         <Query>                             <Where>                                     <Contains><FieldRef Name='Board_x0020_Name' /><Value Type='Text'>Dentistry</Value></Contains>                             </Where>                             <OrderBy>                                 <FieldRef Name='Last_x0020_Name' Ascending='True' />                             </OrderBy>                         </Query>                         </query>                         <viewFields>                             <ViewFields>                                <FieldRef Name='Title' />                                <FieldRef Name='Licensee_x0020_Name' />                                <FieldRef Name='DocIcon' />                                <FieldRef Name='LinkFilename ' />                                <FieldRef Name='License_x0020_Number' />                                <FieldRef Name='Issued_x0020_Date' />                                <FieldRef Name='Last_x0020_Name' />                                <FieldRef Name='First_x0020_Name' />                            </ViewFields>                         </viewFields>                         <rowLimit>2000</rowLimit>                     </GetListItems>                 </soapenv:Body>             </soapenv:Envelope>"

            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                const fs = require('fs');
                /*fs.writeFile("./test.html", response.body, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });*/

                var n = response.body.search(String(req.params.lic_id));
                console.log(req.params.lic_id, n)
                var dici = ""
                if (n == -1) {
                    dici = "No"
                } else {
                    dici = "Yes"
                }

                var result = {
                    "Name": name,
                    "Status": nj['license_status_name'],
                    "ExpiryDate": nj['expiration_date'],
                    "DisciplinaryAction": dici
                };

                if (is_api == "true") {
                    res.send(JSON.stringify(result));
                } else {
                    res.render('pages/status', {result: JSON.stringify(result)});
                }
            });
        }
        //End dici code
        

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