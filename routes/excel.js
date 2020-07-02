//All routes for downloading excel files

const express = require('express');
const router = express.Router();
const texas = require("../excel/texas");
const colorado = require('../excel/colorado');
const massachusetts = require('../excel/massachusetts');
const { response } = require('express');
const newjersey = require('../excel/newjersey');
const florida = require('../excel/florida');

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
router.get("/florida", (req, res) => {
    console.log("in excel.js")
    florida.download_file('https://appsmqa.doh.state.fl.us/MQASearchServices/HealthCareProviders/ExportToCsvLVP?jsonModel=%7B%22Id%22%3A0%2C%22Board%22%3A%227%22%2C%22Profession%22%3A%22701%22%2C%22SpecialtyOrCertification%22%3Anull%2C%22OtherSpecialtyOrCertification%22%3Anull%2C%22LicenseNumber%22%3Anull%2C%22FirstName%22%3Anull%2C%22LastName%22%3Anull%2C%22BusinessName%22%3Anull%2C%22City%22%3Anull%2C%22County%22%3Anull%2C%22ZipCode%22%3Anull%2C%22LicenseStatus%22%3A%22ALL%22%2C%22IsAuthorizedToOrderCannabis%22%3Anull%7D')
        .then(response => {
            res.send(response)
            florida.export_to_mongo()

        })
        .catch(error => {
            res.send(error)
        })
})
router.get("/massachusetts", (req, res) => {
    console.log("In excel.js")
    massachusetts.download_file()
        .then(response => {
            res.send(response)

        })
        .catch(error => {
            res.send(error)
        })
})
router.get("/newjersey", (req, res) => {
    console.log("In excel.js")
    newjersey.download_file()
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            res.send(error)
        })
})

module.exports = router;