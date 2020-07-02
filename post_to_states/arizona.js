const csvtojson = require('csvtojson');
const assert=require('assert');
const puppeteer=require('puppeteer');


(async()=>{
    const browser=await puppeteer.launch({headless:false});
    const page=await browser.newPage();

    await page._client.send('Page.setDownloadBehavior',{behavior:'allow',downloadPath:'./excel'})
    await page.goto('https://azbodprod.glsuite.us/GLSuiteWeb/clients/azbod/public/WebVerificationSearch.aspx')
    await page.click('input[id="ContentPlaceHolder1_rbDentist"]')

    await page.waitFor(10000);

})();