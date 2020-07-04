var request = require('request');
const cheerio=require('cheerio');
var fs = require('fs');


var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://azbodprod.glsuite.us/GLSuiteWeb/clients/azbod/public/WebVerificationSearch.aspx',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  var cookies = response.headers["set-cookie"][0];
  
  console.log(cookies)
  var options = {
    'method': 'POST',
    'url': 'https://azbodprod.glsuite.us/GLSuiteWeb/clients/azbod/public/WebVerificationSearchResultsPRO.aspx',
    'headers': {
      'Connection': ' keep-alive',
      'Content-Length': ' 1481',
      'Upgrade-Insecure-Requests': ' 1',
      'Origin': ' https://azbodprod.glsuite.us',
      'Content-Type': ' application/x-www-form-urlencoded',
      'Accept': ' text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Sec-Fetch-Site': ' same-origin',
      'Sec-Fetch-Mode': ' navigate',
      'Sec-Fetch-User': ' ?1',
      'Sec-Fetch-Dest': ' document',
      'Referer': ' https://azbodprod.glsuite.us/GLSuiteWeb/clients/azbod/public/WebVerificationSearch.aspx',
      'Accept-Encoding': ' gzip, deflate, br',
      'Accept-Language': ' en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
      'Cookie': cookies
    },
    body: "__EVENTTARGET=ctl00%24ContentPlaceHolder1%24btnPro&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUKLTk1OTM3OTE1MA9kFgJmD2QWAgIED2QWAgIHD2QWBgIBDw9kFgIeB29uY2xpY2sFO3RoaXMub25jbGljayA9IGZ1bmN0aW9uICgpIHtyZXR1cm4gZmFsc2U7fTtEaXNhYmxlSW5wdXRzKCk7ZAIXDw9kFgIfAAVDRGlzYWJsZUlucHV0cygpO19fZG9Qb3N0QmFjaygnY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRidG5Qcm8nLCcnKWQCHw8PZBYCHwAFQkRpc2FibGVJbnB1dHMoKTtfX2RvUG9zdEJhY2soJ2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkYnRuQkUnLCcnKWQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgcFI2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkcmJEZW50aXN0BSNjdGwwMCRDb250ZW50UGxhY2VIb2xkZXIxJHJiRGVudGlzdAUlY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRyYkRlbnRhbEh5ZwUlY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRyYkRlbnRhbEh5ZwUlY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRyYkRlbnR1cmlzdAUlY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRyYkRlbnR1cmlzdAUfY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRyYkFueaMPPxBV7Pk0kfJWwn6lXKVmCX2k7omtDdVp2TGUcFtJ&__VIEWSTATEGENERATOR=27B23B15&__EVENTVALIDATION=%2FwEdAAx%2FKrUkLeqwdsBZHVmi8M3qEGz6SNaRIQAUt1wL0jJudArN1yjkSEKaGKyYKsiSWdfNnevapgBPOvuEOS1K8uLGD5C8Oi1lAnwX4T%2BicGEqfW7h7xQz2FWAREOtD6SVOrkPxttllAx1ejOzdLby4QKxGu4o6paXlRlxhx55WgPRx%2FiQWKsjRdiHYEYwpdgKNpIkiW63ZmRgK2HArpZ78AXB9gwSfNzPHvX4u2pn54pE4hmjhBxG3Gb5J9tE8LcXi8kxY1FesX4XLs%2FEsokcEX44jsVDLf6zw5rl%2FC%2FduJhdzA%3D%3D&ctl00%24ContentPlaceHolder1%24Pro=rbDentist&ctl00%24ContentPlaceHolder1%24tbFirstName=&ctl00%24ContentPlaceHolder1%24tbLastName=&ctl00%24ContentPlaceHolder1%24tbProLicNum=D06415&ctl00%24ContentPlaceHolder1%24tbBELicNum="
  
  };
request(options, function (error, response) {
  if (error) throw new Error(error);
  fs.writeFile("./test.html", response.body, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    });
});
