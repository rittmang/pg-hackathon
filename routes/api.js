const express = require('express');
const request = require("request");
const router = express.Router();
//Root path for API

const license = require('./license');
const npi = require('./npi');
var async = require('async');

router.use('/license', license);
///api/license
router.use('/npi', npi);
///api/npi

router.use(function (req,res,next){
    console.log('API Router');
    next();
})

router.get('/', function (req,res) {
    var arr = JSON.parse(req.query.array);
    console.log(arr);
    var state = arr[0];
    var license_num = arr[1];
    var npi = arr[3];
    var param_name = arr[2];
    var is_api = true;
    var result = [state,param_name];
    var license_url = "http://localhost:5000/api/license/"+state+"/"+ license_num + "?param_name=" + param_name + "&is_api="+is_api;
    var npi_url = "http://localhost:5000/api/npi/" + npi + "?is_api="+is_api;
    request.get(license_url, function (error, response, body){
        console.log(license_url);
        console.log(typeof body);
        console.log(body);
        console.log(npi_url);
        result.push(body)
        request.get(npi_url, function (error, response, body){
            console.log(npi_url);
            console.log(typeof body);
            console.log(body);
            result.push(body);
            console.log(result);
            res.render("pages/status", {result: JSON.stringify(result)});
        });
        //come back to -----
    });                 ///|
    ///                 here

})

module.exports = router;