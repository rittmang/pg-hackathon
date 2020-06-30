const https = require('https')
const fs = require('fs')

const csvtojson = require('csvtojson')
const assert = require('assert')



module.exports = {

    /*
    ** This method downloads the file
    ** from the URL specified in the 
    ** parameters 
    */
    download_file: function (url) {
        console.log("in massachusetts.js")
        const options = {
            headers: {
                "User-Agent": "pg-hack/7.68.0",
                "Host":"checkalicense.hhs.state.ma.us",
                "Sec-Fetch-Dest":"document",
                "Sec-Fetch-Mode":"navigate",
                "Sec-Fetch-Site":"none",
                "Cookie":"ASP.NET_SessionId=51sgtha2gxfd53adnldiyprt"
            }
        }
        return new Promise((resolve, reject) => {

            let file = fs.createWriteStream('./excel/MassachusettsDentist.csv');
            https.get(url, options, function (response) {
            var x=1
                response.on('data', function (chunk) {
                    console.log(x)
                    x+=1
                    file.write(chunk)
                })
                response.on('end', function () {
                    resolve('File download completed.')
                })
            })
        })

    },
    export_to_mongo: async function () {

        csvtojson()
            .fromFile('./excel/MasachusettsDentist.csv')
            .then(csvData => {
                //console.log(csvData);
                const MongoClient = require('mongodb').MongoClient;
                const uri = "mongodb+srv://ritom:ritom@fustercluck-skuxd.mongodb.net/pg-hackathon?retryWrites=true&w=majority";
                (async function () {
                    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

                    try {
                        await client.connect();
                        console.log('Connected to Mongo Server');
                        const db = client.db('pg-hackathon');
                        let s = await db.collection('colorado').drop();
                        console.log('older collection dropped');
                        let r = await db.collection('colorado').insertMany(csvData);
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