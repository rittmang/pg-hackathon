var request = require('request');
var fs = require('fs');

var options = {
  'method': 'POST',
  'url': 'https://checkalicense.hhs.state.ma.us/MyLicenseVerification/PrefDetails.aspx',
  'headers': {
    'Content-Length': ' 262',
    'Cache-Control': ' max-age=0',
    'Upgrade-Insecure-Requests': ' 1',
    'Origin': ' https://checkalicense.hhs.state.ma.us',
    'Content-Type': ' application/x-www-form-urlencoded',
    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    'Accept': ' text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site': ' same-origin',
    'Sec-Fetch-Mode': ' navigate',
    'Sec-Fetch-User': ' ?1',
    'Sec-Fetch-Dest': ' document',
    'Referer': ' https://checkalicense.hhs.state.ma.us/MyLicenseVerification/PrefDetails.aspx',
    'Accept-Language': ' en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
    'Cookie': ' ASP.NET_SessionId=wkldswb4vqwxmjesvccsbkuz'
  },
  body: "__VIEWSTATE=%2FwEPDwUJNzM2NTgwNzkyZGR26V4nAx3F2vBTnMRog2M%2F1JCRkaxNfLzktwxdFRSI8w%3D%3D&__VIEWSTATEGENERATOR=91DA64E5&__EVENTVALIDATION=%2FwEWAwKWweDFCwKYp%2FXBBALPm9D%2BDl9sNUb6bMxezDUyhBqHjEkNmeCzPI0O2%2BbErVQMOyn%2B&filetype=delimitedtext&sch_button=Download"

};
request(options, function (error, response) {
  //if (error) throw new Error(error);

  fs.writeFile('mass.txt', response.body, function (err) {
        //if (err) return console.log(err);
        console.log('probably loaded ... not sure  ... check main directory mass.txt');
      });
  
});
