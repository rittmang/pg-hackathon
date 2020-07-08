var request = require('request');
var fs = require('fs');
const cheerio=require('cheerio');
var options = {
  'method': 'POST',
  'url': 'https://www.membersbase.com/lsbdweb/directory_result.asp',
  'headers': {
    'Connection': ' keep-alive',
    'Content-Length': ' 47',
    'Cache-Control': ' max-age=0',
    'Upgrade-Insecure-Requests': ' 1',
    'Origin': ' https://www.membersbase.com',
    'Content-Type': ' application/x-www-form-urlencoded',
    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    'Accept': ' text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site': ' same-origin',
    'Sec-Fetch-Mode': ' navigate',
    'Sec-Fetch-User': ' ?1',
    'Sec-Fetch-Dest': ' document',
    'Referer': ' https://www.membersbase.com/lsbdweb/licenseverification.htm?new=New+Search',
    'Accept-Language': ' en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
    'Cookie': ' ASPSESSIONIDQGACRSBT=JAOGFPICGFMFGIHDBMKDMMPF; ASPSESSIONIDQGACRSBT=JCOGFPICKCDABBEIMAKLPANH'
  },
  body: "txtlicno=7008&txtlname=&txtfname=&search=Search"

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  fs.writeFile('test.html', response.body, function (err) {
    //console.log('Hello World > helloworld.txt');
});
var $ = cheerio.load(response.body);
    var name = $('body > table:nth-child(3) > tbody > tr:nth-child(2) > td > form > table > tbody > tr:nth-child(3) > td:nth-child(3) > font').text() +" "+ $('body > table:nth-child(3) > tbody > tr:nth-child(2) > td > form > table > tbody > tr:nth-child(3) > td:nth-child(4) > font').text()
    var status = $('body > table:nth-child(3) > tbody > tr:nth-child(2) > td > form > table > tbody > tr:nth-child(3) > td:nth-child(5) > font').text()
    var expDate = $('body > table:nth-child(3) > tbody > tr:nth-child(2) > td > form > table > tbody > tr:nth-child(3) > td:nth-child(8) > font').text()
    
    var dis = $('body > table:nth-child(3) > tbody > tr:nth-child(2) > td > form > table > tbody > tr:nth-child(3) > td:nth-child(6)').text()

    var result = {"Name": name, "Status": status, "ExpiryDate": expDate, "DisciplinaryAction": dis}
    console.log(result)
});
