var request = require('request');
var fs = require('fs');
const cheerio=require('cheerio');
var options = {
  'method': 'POST',
  'url': 'https://www.kansas.gov/dental-verification/search.do;jsessionid=0401FDA2AA6A1D4BEAC1FEEE3D23C656.aptc02-inst1',
  'headers': {
    'Content-Length': ' 70',
    'Cache-Control': ' max-age=0',
    'Upgrade-Insecure-Requests': ' 1',
    'Origin': ' https://www.kansas.gov',
    'Content-Type': ' application/x-www-form-urlencoded',
    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    'Accept': ' text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site': ' same-origin',
    'Sec-Fetch-Mode': ' navigate',
    'Sec-Fetch-User': ' ?1',
    'Sec-Fetch-Dest': ' document',
    'Referer': ' https://www.kansas.gov/dental-verification/start.do',
    'Accept-Language': ' en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
    'Cookie': ' JSESSIONID=0401FDA2AA6A1D4BEAC1FEEE3D23C656.aptc02-inst1; ksgov=rd1540o00000000000000000000ffffac1e2246o443; _ga=GA1.2.958390024.1594225521; _gid=GA1.2.1443877518.1594225521; _gat_UA-119772598-1=1; _gat_UA-119772598-13=1; _gat_UA-33631537-2=1'
  },
  body: "licNum=60657&lastName=&middle=&firstName=adam&_eventId_submit=Continue"

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  fs.writeFile('test.html', response.body, function (err) {
    //console.log('Hello World > helloworld.txt');
    });
    
    var $ = cheerio.load(response.body);
    var name = $('#global-content > table > tbody > tr:nth-child(2) > td:nth-child(2)').text()
    var status = $('#global-content > table > tbody > tr:nth-child(12) > td:nth-child(2)').text()
    var expDate = $('#global-content > table > tbody > tr:nth-child(10) > td:nth-child(2)').text()
    
    var dis = $('#global-content > table > tbody > tr:nth-child(13) > td:nth-child(2)').text()
    if(dis=="No")
    {
        var disi = "No"
    }
    else
    {
        var disi = "Yes"
    }
    var result = {"Name": name, "Status": status, "ExpiryDate": expDate, "DisciplinaryAction": disi}
});
