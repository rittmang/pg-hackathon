var request = require('request');
var fs = require('fs');
const cheerio=require('cheerio');
var options = {
  'method': 'POST',
  'url': 'https://www.membersbase.com/NCBDESearch/searchresult.asp',
  'headers': {
    'Connection': ' keep-alive',
    'Content-Length': ' 56',
    'Cache-Control': ' max-age=0',
    'Upgrade-Insecure-Requests': ' 1',
    'Origin': ' https://www.ncdentalboard.org',
    'Content-Type': ' application/x-www-form-urlencoded',
    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    'Accept': ' text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site': ' cross-site',
    'Sec-Fetch-Mode': ' navigate',
    'Sec-Fetch-User': ' ?1',
    'Sec-Fetch-Dest': ' document',
    'Referer': ' https://www.ncdentalboard.org/license_verification.htm',
    'Accept-Language': ' en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
    'Cookie': ' ASPSESSIONIDQGACRSBT=MFMGFPICELJMNNAADHAOOHJA; ASPSESSIONIDQGACRSBT=DGMGFPICHHIBKDIOHLBLKANK'
  },
  body: "type=D&firstname=&lastname=&license=106890&Submit=Submit"

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  fs.writeFile('test.html', response.body, function (err) {
    //console.log('Hello World > helloworld.txt');
    });
    var $ = cheerio.load(response.body);

    var name = $('body > table:nth-child(1) > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(3) > td:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(3) > td:nth-child(1) > b').text()
    //console.log(name)
    var status = $('body > table:nth-child(1) > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(3) > td:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(6) > td:nth-child(2)').text()
    var colan_status = status.search(":")
    status = status.slice(colan_status+1,-1)
    //console.log(status)
    var expDate = $('body > table:nth-child(1) > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(3) > td:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(5) > td:nth-child(2)').text()
    var colan_exp = expDate.search(":")
    expDate = expDate.slice(colan_exp+1,-1)
    //console.log(expDate)
    var dis = $('body > table:nth-child(1) > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(3) > td:nth-child(1) > div:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(6) > td:nth-child(1)').text()
    var colan_dis = dis.search("N")
    if(colan_dis==-1)
    {
        var disi = "Yes"
    }
    else
    {
        var disi = "No"
    }

    var result = {"Name": name, "Status": status, "ExpiryDate": expDate, "DisciplinaryAction": disi}
    
});
