//All routes for downloading excel files

const express = require('express');
const router = express.Router();
const texas = require("../excel/texas");
const colorado = require('../excel/colorado');

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

module.exports = router;