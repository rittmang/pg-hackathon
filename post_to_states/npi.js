var request = require('request');

var dict = {
    number:"",
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
    console.log(body)
});
