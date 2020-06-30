var request = require('request');
var zlib = require("zlib");
var fs = require('fs');
const cheerio=require('cheerio');
const { callbackify } = require('util');
var linkNew = ""

var options = {
  'method': 'POST',
  'url': 'https://search.dca.ca.gov/results',
  'headers': {
    'Connection': ' keep-alive',
    'Content-Length': ' 93',
    'Cache-Control': ' max-age=0',
    'Upgrade-Insecure-Requests': ' 1',
    'Origin': ' https://search.dca.ca.gov',
    'Content-Type': ' application/x-www-form-urlencoded',
    'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    'Accept': ' text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-Fetch-Site': ' same-origin',
    'Sec-Fetch-Mode': ' navigate',
    'Sec-Fetch-User': ' ?1',
    'Sec-Fetch-Dest': ' document',
    'Referer': ' https://search.dca.ca.gov/',
    'Accept-Language': ' en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
    'Cookie': ' _ga=GA1.2.886728155.1593193980; _gid=GA1.2.1723269015.1593429267; _gat=1',
  },
  body: "boardCode=9&licenseType=250&licenseNumber=65083&busName=&firstName=&lastName=&registryNumber="

};
request(options, function (error, response) {
    if (error) throw new Error(error);
    //console.log(response.body);
    /*fs.writeFile('test.html', response.body, function (err) {
        if (err) return console.log(err);
        //console.log('Hello World > helloworld.txt');
      });*/
    var $ = cheerio.load(response.body);

    linkNew = "https://search.dca.ca.gov" + $("#\\30  > footer > ul:nth-child(2) > li:nth-child(2) > a").attr('href')
    var options = {
        'method': 'GET',
        'url': linkNew,
        };
        request(options, function (error, response) {
        if (error) throw new Error(error);
    
        fs.writeFile('test.html', response.body, function (err) {
            if (err) return console.log(err);
            //console.log('Hello World > helloworld.txt');
          });

        $ = cheerio.load(response.body);
        var name = $("#name").text()
        var len = name.length
        name = name.slice(6, len);
        console.log("Name :" ,name)
        var status  = $("#primaryStatus").text().trim()
        var len = status.length
        status = status.slice(16, len);
        console.log("Status : ",status)
        var expdate = $("#expDate").text()
        console.log("Exp Date : ",expdate)

        });
     
    //var data = response.body
});
