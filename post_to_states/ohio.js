var request = require('request');
const { ResumeToken } = require('mongodb');
var options = {
  'method': 'POST',
  "rejectUnauthorized": false,
  "requestCert": true,
  "agent": false,
  'url': 'https://elicense.ohio.gov/apexremote',
  'headers': {
    'Connection': ' keep-alive',
    'Content-Length': ' 871',
    'X-User-Agent': ' Visualforce-Remoting',
    'DNT': ' 1',
    'X-Requested-With': ' XMLHttpRequest',
    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    'Content-Type': ' application/json',
    'Accept': ' */*',
    'Origin': ' https://elicense.ohio.gov',
    'Sec-Fetch-Site': ' same-origin',
    'Sec-Fetch-Mode': ' cors',
    'Sec-Fetch-Dest': ' empty',
    'Referer': ' https://elicense.ohio.gov/oh_verifylicense?firstName=&lastName=&licenseNumber=&searchType=individual',
    'Accept-Language': ' en-US,en;q=0.9',
  },
  body: "[{\"action\":\"OH_VerifyLicenseCtlr\",\"method\":\"fetchmetadata\",\"data\":[\"\",\"_\\u0001_\"],\"type\":\"rpc\",\"tid\":6,\"ctx\":{\"csrf\":\"VmpFPSxNakF5TUMwd055MHdORlF3Tmpvek9EbzFOaTR3TnpKYSxBSllGMkVCbkJKUzZ0ODZZLWdKbnk1LFlqUTFNemxq\",\"vid\":\"066t0000000L0A9\",\"ns\":\"\",\"ver\":41}},{\"action\":\"OH_VerifyLicenseCtlr\",\"method\":\"findLicensesForOwner\",\"data\":[{\"firstName\":\"\",\"lastName\":\"\",\"middleName\":\"\",\"contactAlias\":\"\",\"board\":\"\",\"licenseType\":\"_\\u0001_\",\"licenseNumber\":\"31.001685\",\"city\":\"\",\"state\":\"none\",\"county\":\"\",\"businessBoard\":\"\",\"businessLicenseType\":\"_\\u0001_\",\"businessLicenseNumber\":\"\",\"businessCity\":\"\",\"businessState\":\"none\",\"businessCounty\":\"\",\"businessName\":\"\",\"dbafileld\":\"\",\"searchType\":\"individual\"}],\"type\":\"rpc\",\"tid\":7,\"ctx\":{\"csrf\":\"VmpFPSxNakF5TUMwd055MHdORlF3Tmpvek9EbzFOaTR3TnpKYSx4ODZKRExrY2JPTWlpT0wwWFQtZmZqLFpUWXhZemxr\",\"vid\":\"066t0000000L0A9\",\"ns\":\"\",\"ver\":41}}]"

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var temp = JSON.parse(response.body);
  var data = temp[1].result[0].license;
  var name = data.Applicant_Full_Name__c;
  var expDate = new Date(data.MUSW__Expiration_Date__c);
  var expDate1 = expDate.getDate()+"-"+expDate.getMonth()+"-"+expDate.getFullYear();
  var status = data.MUSW__Status__c;
  var boardAction = data.Board_Action__c;

  console.log("Name: ",name);
  console.log("Expiry Date: ",expDate1);
  console.log("Status: ",status);
  console.log("Board Action: ",boardAction);
});
