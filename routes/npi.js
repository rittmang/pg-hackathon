var request = require('request');
const express = require('express');

const router = express.Router();

router.use(function (req,res,next){
    console.log('NPI Router');
    next();
})

router.get('/', function(req,res){
    var dict = {
        number: "",
        enumeration_type : "",
        taxonomy_description : "",
        first_name:"",
        last_name:"",
        organization_name:"",
        address_purpose:"",
        city:"baltimore",
        state:"",
        postal_code:"",
        country_code:"",
        limit:"",
        skip:""
    };
    var result = "";
    for (var p in dict) {
        if( dict.hasOwnProperty(p) ) {
            result += p + "=" + dict[p] + "&";
        }
    }
    result = result.slice(0,result.length-1)
    var url = "https://npiregistry.cms.hhs.gov/api/?version=2.0&" + result
    request({
        url: url,
        method: "GET",
    }, function (error, response, body){
        console.log(body);
        res.send(body);
    });
});

router.get('/:npi_num', function(req,res){
    var npi_num = req.params.npi_num;
    var dict = {
        number: npi_num,
        enumeration_type : "",
        taxonomy_description : "",
        first_name:"",
        last_name:"",
        organization_name:"",
        address_purpose:"",
        city:"baltimore",
        state:"",
        postal_code:"",
        country_code:"",
        limit:"",
        skip:""
    };
    var result = "";
    for (var p in dict) {
        if( dict.hasOwnProperty(p) ) {
            result += p + "=" + dict[p] + "&";
        }
    }
    result = result.slice(0,result.length-1)
    var url = "https://npiregistry.cms.hhs.gov/api/?version=2.0&" + result
    request({
        url: url,
        method: "GET",
    }, function (error, response, body){
        console.log(body);
        res.send(body);
    });

});



module.exports = router;

