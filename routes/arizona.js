const puppeteer=require('puppeteer');
const express = require('express');

const router = express.Router();

router.use(function (req,res,next){
    console.log('Arizona Router');
    next();
})
//0492 test license - name - john

router.get('/:lic_id',  function(req, res){
    var lic_id = req.params.lic_id;
    var is_api = req.query.is_api;
    (async(lno=`${lic_id}`)=>{
        console.log(lno);
        const browser=await puppeteer.launch({headless:true});
        const page=await browser.newPage();

        await page._client.send('Page.setDownloadBehavior',{behavior:'allow',downloadPath:'./excel'});
        await page.goto('https://azbodprod.glsuite.us/GLSuiteWeb/clients/azbod/public/WebVerificationSearch.aspx');
        await page.click('input[id="ContentPlaceHolder1_rbDentist"]');
        await page.$eval('input[id="ContentPlaceHolder1_tbProLicNum"]',(el,value)=>el.value=value,lno);
        await page.click('input[id="ContentPlaceHolder1_btnPro"]');
        await page.waitFor(10000);

        let urls=await page.evaluate(()=>{
            let result="";
            var items=document.getElementsByTagName('a');

            result=items[4].href;
            return result;
        })
        console.log(urls);
        await page.goto(urls);

        let person_details=await page.evaluate(()=>{
            const ths=document.getElementById('ContentPlaceHolder1_dtgGeneralN');
            const tds=Array.from(ths.querySelectorAll('tbody tr td'));

            return tds.map(td=>td.innerText);
        });
        let license_details=await page.evaluate(()=>{
            const ths=document.getElementById('ContentPlaceHolder1_dtgGeneral');
            const tds=Array.from(ths.querySelectorAll('tbody tr td'));

            return tds.map(td=>td.innerText);
        });
        let education_details=await page.evaluate(()=>{
            const ths=document.getElementById('ContentPlaceHolder1_dtgEducation');
            const tds=Array.from(ths.querySelectorAll('tbody tr td'));

            return tds.map(td=>td.innerText);
        })
        let disciplinary_actions=await page.evaluate(()=>{
            try {
                const ths=document.getElementById('ContentPlaceHolder1_dtgDisciplinaryBoardActions');
                const tds=Array.from(ths.querySelectorAll('tbody tr td'));
                return 'Yes';
            } catch (error) {
                return 'No';
            }
        })
        console.log(person_details);
        console.log(license_details);
        console.log(education_details);
        console.log(disciplinary_actions);
        //await page.click('a[href="WebVerificationProfileDetailsPRO.aspx?EntityID=1403943&LicenseID=97776&LicType=1872"]')
        await page.waitFor(10000);
        await browser.close();
        var result = [person_details[0],license_details[3], license_details[9],disciplinary_actions];
        if(is_api == "true"){
            res.send(JSON.stringify(result));
        }
        else{
            res.render('pages/status', {result: JSON.stringify(result)});
        }
    })();
});

module.exports = router;