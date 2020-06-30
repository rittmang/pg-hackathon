var request = require('request');
const cheerio=require('cheerio');


var body = "profcd=50&plicno=050608"
var options = {
  'method': 'POST',
  'url': 'http://www.nysed.gov/COMS/OP001/OPSCR2',
  'headers': {
    'Content-Type': 'text/plain'
  },
  body: body

};


request(options, function (error, response) {
    if (error) throw new Error(error);

    const fs = require('fs');
    fs.writeFile("./test.html", response.body, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    const $ = cheerio.load( response.body);

    var stringEntire = ($("#content_column").text())
    var lines = stringEntire.split('\n');
    for(var i = 0;i < lines.length;i++){
        //code here using lines[i] which will give you each line
        if (lines[i].search("Name") != -1)
        {
            nameStr = lines[i]
            var len = nameStr.length
            var res = nameStr.slice(8, len-1);
            console.log("name",res)
        }
        if (lines[i].search("Status") != -1)
        {
            nameStr = lines[i]
            var len = nameStr.length
            var res = nameStr.slice(11, len-1);
            console.log("status",res)
        }
        if (lines[i].search("Registered through last day of :") != -1)
        {
            nameStr = lines[i]
            var len = nameStr.length
            var res = nameStr.slice(33, len-1);
            console.log("Registered through last day of :",res)
        }
    }
    //var name = str.search("W3Schools");
});
