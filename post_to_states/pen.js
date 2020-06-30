const request = require('request');



var myJSONObject = {"OptPersonFacility":"Person","ProfessionID":13,"LicenseTypeId":156,"LicenseNumber":"DS018933L","State":"","Country":"ALL","County": "","IsFacility":0,"PersonId":"","PageNo":1};
//DS018933L is the license 
// just change the license number in var myJSONObject ... others i have set to dentist ke options only

request({
    url: "https://www.pals.pa.gov/api/Search/SearchForPersonOrFacilty",
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
    var dict = body[0];
    //console.log(dict)
    console.log(dict["FirstName"],dict["MiddleName"],dict["LastName"])
    console.log(dict["Status"])
    console.log(dict["DisciplinaryAction"])
    callback()
});
function callback(){
    console.log("katam")
}