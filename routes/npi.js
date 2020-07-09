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
    var is_api = req.query.is_api;
    var dict = {
        number: npi_num,
        enumeration_type : "",
        taxonomy_description : "",
        first_name:"",
        last_name:"",
        organization_name:"",
        address_purpose:"",
        city:"",
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
        //console.log(result);
        var temp = JSON.parse(body);
        console.log(temp["results"][0]["basic"]["first_name"])
        if (temp["results"][0]["basic"]["first_name"] == undefined)
        {
            var first_name = ""
        }
        else
        {
            var first_name = temp["results"][0]["basic"]["first_name"] 
        }
        if (temp["results"][0]["basic"]["middle_name"] == undefined)
        {
            var middle_name = ""
        }
        else
        {
            var middle_name = temp["results"][0]["basic"]["middle_name"] 
        }
        if (temp["results"][0]["basic"]["last_name"]  == undefined)
        {
            var last_name = ""
        }
        else
        {
            var last_name = temp["results"][0]["basic"]["last_name"] 
        }


        if(is_api == "true"){
            var name = first_name + " " + middle_name + " " + last_name
            res.send(name); //Test
        }
        else{
            var name = first_name + " " + middle_name + " " + last_name
            res.send(name); //Test
        }

    });

});



module.exports = router;

