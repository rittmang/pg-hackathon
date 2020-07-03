const https = require('https')
const fs = require('fs')
//require('https').globalAgent.options.ca=require('ssl-root-cas/latest').create()
const csvtojson = require('csvtojson')
const assert = require('assert')

module.exports = {
    download_file: function (url) {
        console.log("in florida.js")
        // var sslRootCAs=require('ssl-root-cas/latest');
        // sslRootCAs.inject();
        const options = {
            rejectUnauthorized:false,
            requestCert:true,
            headers: {
                "User-Agent": "pg-hack/7.68.0"
            }
        }
        return new Promise((resolve, reject) => {
            let file = fs.createWriteStream('./excel/downloads/FloridaDentist.csv');
            var x = 1;
            https.get(url, options, function (response) {
                response.on('data', function (chunk) {
                    file.write(chunk)
                })
                response.on('end', function () {
                    resolve('File download completed.')
                })
            })
        })
       
        // const file=fs.createWriteStream("./excel/FloridaDentist.csv");
        // const request=https.get(url,function(response){
        //     response.pipe(file);
        // })
    },
    export_to_mongo: function () {

        csvtojson({
            delimiter:'|',
            noheader:false,
            headers:['proCode','professionName','licId','expireDate','originalDate','rankCode','licenseNumber','statusEffectiveDate','boardActionIndicator','licenseStatusDescription','lastName','firstName','middleName','nameSuffix','businessName','licenseActiveStatusDescription','county','countyDescription','mailingAddressLine1','mailingAddressLine2','mailingAddressCity','mailingAddressState','mailingAddressZipCode','mailingAddressAreaCode','mailingAddressPhoneNumber','mailingAddressPhoneExtension','practiceLocationAddressLine1','practiceLocationAddressLine2','practiceLocationAddressCity','practiceLocationAddressState','practiceLocationAddressZipCode','email','modCdes','prescribeInd','dispensingInd']
        })
            .fromFile('./excel/downloads/FloridaDentist.csv')
            .then(csvData => {
                //console.log(csvData);
                const MongoClient = require('mongodb').MongoClient;
                const uri = "mongodb+srv://ritom:ritom@fustercluck-skuxd.mongodb.net/pg-hackathon?retryWrites=true&w=majority";
                //const uri = "mongodb://localhost/license";
                (async function () {
                    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

                    try {
                        await client.connect();
                        console.log('Connected to Mongo Server');
                        const db = client.db('pg-hackathon');
                        //const db = client.db('license');
                        let s = await db.collection('floridas').drop();
                        console.log('older collection dropped');
                        let r = await db.collection('floridas').insertMany(csvData);
                        assert.equal(csvData.length, r.insertedCount);
                    } catch (err) {
                        console.log(err.stack);
                    }
                    client.close();
                    console.log('Client closed succesfully');
                })();
            });
    }

}