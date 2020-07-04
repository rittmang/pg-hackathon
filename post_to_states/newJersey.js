var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://www.njconsumeraffairs.gov/_vti_bin/lists.asmx\n',
  'headers': {
    'accept': ' application/xml, text/xml, */*; q=0.01',
    'accept-language': ' en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
    'content-length': ' 1580',
    'content-type': ' text/xml; charset="UTF-8"',
    'origin': ' https://www.njconsumeraffairs.gov',
    'referer': ' https://www.njconsumeraffairs.gov/den/Pages/actions.aspx',
    'sec-fetch-dest': ' empty',
    'sec-fetch-mode': ' cors',
    'sec-fetch-site': ' same-origin',
    'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    'x-requested-with': ' XMLHttpRequest'
  },
  body: "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'>                 <soapenv:Body>                      <GetListItems xmlns='http://schemas.microsoft.com/sharepoint/soap/'>                         <listName>Actions</listName>                         <query>                         <Query>                             <Where>                                     <Contains><FieldRef Name='Board_x0020_Name' /><Value Type='Text'>Dentistry</Value></Contains>                             </Where>                             <OrderBy>                                 <FieldRef Name='Last_x0020_Name' Ascending='True' />                             </OrderBy>                         </Query>                         </query>                         <viewFields>                             <ViewFields>                                <FieldRef Name='Title' />                                <FieldRef Name='Licensee_x0020_Name' />                                <FieldRef Name='DocIcon' />                                <FieldRef Name='LinkFilename ' />                                <FieldRef Name='License_x0020_Number' />                                <FieldRef Name='Issued_x0020_Date' />                                <FieldRef Name='Last_x0020_Name' />                                <FieldRef Name='First_x0020_Name' />                            </ViewFields>                         </viewFields>                         <rowLimit>2000</rowLimit>                     </GetListItems>                 </soapenv:Body>             </soapenv:Envelope>"

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  const fs = require('fs');
    /*fs.writeFile("./test.html", response.body, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });*/
    
    var n = response.body.search("22DI01694100");
    console.log(n)

    
});
