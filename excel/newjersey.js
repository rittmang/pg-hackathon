const csvtojson = require('csvtojson')
const assert = require('assert')
const puppeteer = require('puppeteer');



module.exports = {

    /*
    ** This method downloads the file
    ** from the URL specified in the 
    ** parameters 
    */
    download_file: async function () {

        const browser = await puppeteer.launch({ headless: true,args:['--no-sandbox'] });
        const page = await browser.newPage();
        //await page.setRequestInterception(true);
        await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: './excel' })
        await page.goto('https://newjersey.mylicense.com/Verification_Bulk/Search.aspx?facility=N');
        await page.select('select[name="t_web_lookup__profession_name"]', 'Dentistry');
        await page.waitForSelector('select[name="t_web_lookup__license_type_name"]')
            .then(() => console.log('got second button'));
        await page.waitFor(5000);
        await page.select('select[name="t_web_lookup__license_type_name"]', 'Dentist');
        await page.waitForSelector('input[name="sch_button"]')
            .then(() => console.log('got submit button'));
        await page.click('input[name="sch_button"]')
        await page.waitFor(5000);
        await page.waitForSelector('input[name="btnBulkDownLoad"]')
            .then(() => console.log('got Download File button'))
        await page.click('input[name="btnBulkDownLoad"]')
        await page.waitFor(5000);
        await page.waitForSelector('input[name="btnContinue"]')
            .then(() => console.log('got Continue button'))
        await page.click('input[name="btnContinue"]')
        await page.waitFor(5000);
        await page.waitForSelector('input[name="sch_button"]')
            .then(() => console.log('Got Download button'))
        await page.click('input[name="sch_button"')
        await page.waitFor(60000);
        await browser.close()
        await this.export_to_mongo()
    },
    export_to_mongo: async function () {

        csvtojson({
            delimiter: '|'
        })
            .fromFile('./excel/downloads/Data.txt')
            .then(csvData => {
                console.log(csvData);
                const MongoClient = require('mongodb').MongoClient;
                const uri = "mongodb+srv://ritom:ritom@fustercluck-skuxd.mongodb.net/pg-hackathon?retryWrites=true&w=majority";
                (async function () {
                    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

                    try {
                        await client.connect();
                        console.log('Connected to Mongo Server');
                        const db = client.db('pg-hackathon');
                        let s = await db.collection('newjerseys').drop();
                        console.log('older collection dropped');
                        let r = await db.collection('newjerseys').insertMany(csvData);
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