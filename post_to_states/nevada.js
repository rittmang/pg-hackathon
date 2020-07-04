const request = require('request');

var options = {
  'method': 'POST',
  'url': 'https://ws.nvdental.org/api/Individual/IndividualVerifyLicenseDental',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"sortType":"LicenseNumber","sortOrder":"asc","currentPage":1,"totalRecords":82,"pageSize":10,"maxSize":5,"Data":{"LastName":"","FirstName":"","LicenseNumber":"0619"}})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
    //console.log(response.body);
    var temp  = JSON.parse(response.body);
    var user_id = temp["PagerVM"]["Records"][0]["IndividualId"];
    var options = {
      'method': 'GET',
      'url': 'https://ws.nvdental.org/api/Individual/VerifyLicenseSearchBYIndividualId?IndividualId='+user_id,
      'headers': {
        'Content-Type': 'application/json'
      },
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
        //console.log(response.body);
        var temp1 = JSON.parse(response.body);
        console.log(temp1["lstVerifyLicenseSearchResponse"][0]["FirstName"],temp1["lstVerifyLicenseSearchResponse"][0]["LastName"]);
        console.log(temp1["lstVerifyLicenseSearchResponse"][0]["LicenseStatusTypeName"]);
        console.log(temp1["lstVerifyLicenseSearchResponse"][0]["ExpirationDate"]);
        if (temp1["lstVerifyLicenseSearchResponse"][0]["MalpracticeList"][0]["ActionType"] != null)
        {
          console.log("Yes")
        }
        else
        {
          console.log("No")
        }

      
    });
});




