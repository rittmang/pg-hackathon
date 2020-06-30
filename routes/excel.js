//All routes for downloading excel files

const express = require('express');
const router = express.Router();
const texas = require("../excel/texas");
const colorado = require('../excel/colorado');
const massachusetts = require('../excel/massachusetts');
const { response } = require('express');

router.use(function (req, res, next) {
    console.log('Excel Router');
    next();
})

router.get("/texas", (req, res) => {
    texas.download_file('http://ls.tsbde.texas.gov/csv/Dentist.csv')
        .then(response => {
            res.send(response)
            texas.export_to_mongo()
        })
        .catch(error => {
            res.send(error)
        })

})
router.get("/colorado", (req, res) => {
    console.log("In excel.js")
    colorado.download_file('https://apps.colorado.gov/dora/licensing/Lookup/FileDownload.aspx?Idnt=2240736&Type=Comma')
        //colorado.download_file('')
        .then(response => {
            res.send(response)
            colorado.export_to_mongo()
        })
        .catch(error => {
            res.send(error)
        })
})
router.get("/massachusetts",(req,res)=>{
    console.log("In excel.js")
    massachusetts.download_file('https://checkalicense.hhs.state.ma.us/MyLicenseVerification/PrefDetails.aspx?__VIEWSTATE=%2FwEPDwUJNzM2NTgwNzkyZGR26V4nAx3F2vBTnMRog2M%2F1JCRkaxNfLzktwxdFRSI8w%3D%3D&__VIEWSTATEGENERATOR=91DA64E5&__EVENTVALIDATION=%2FwEWAwKWweDFCwKYp%2FXBBALPm9D%2BDl9sNUb6bMxezDUyhBqHjEkNmeCzPI0O2%2BbErVQMOyn%2B&filetype=delimitedtext&sch_button=Download')
        .then(response=>{
            res.send(response)
            //massachusetts.export_to_mongo()
        })
        .catch(error=>{
            res.send(error)
        })
})

module.exports = router;