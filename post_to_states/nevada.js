const request = require('request');

var options = {
  'method': 'POST',
  'url': 'https://ws.nvdental.org/api/Individual/IndividualVerifyLicenseDental',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"sortType":"LicenseNumber","sortOrder":"asc","currentPage":1,"totalRecords":82,"pageSize":10,"maxSize":5,"Data":{"LastName":"","FirstName":"john","LicenseNumber":"0492"}})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
    console.log(response.body);
    var temp  = JSON.parse(response.body);
    user_id = temp["PagerVM"]["Records"][0]["IndividualId"];
    console.log(temp["PagerVM"]["Records"][0]["FirstName"],temp["PagerVM"]["Records"][0]["MiddleName"],temp["PagerVM"]["Records"][0]["LastName"])
    console.log(temp["PagerVM"]["Records"][0]["LicenseStatusTypeName"])
    console.log(temp["PagerVM"]["Records"][0]["ExpirationDate"])
});




