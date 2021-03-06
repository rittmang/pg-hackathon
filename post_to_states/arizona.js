const puppeteer=require('puppeteer');
//var lno="D01711";

(async(lno="D01711")=>{
    console.log(lno);
    const browser=await puppeteer.launch({headless:false});
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
            return (tds.length/3-1)+' disciplinary actions';
        } catch (error) {
            return 'No disciplinary actions';
        }
    })
    console.log(person_details);
    console.log(license_details);
    console.log(education_details);
    console.log(disciplinary_actions);
    //await page.click('a[href="WebVerificationProfileDetailsPRO.aspx?EntityID=1403943&LicenseID=97776&LicType=1872"]')
    await page.waitFor(10000);
    await browser.close();
})();