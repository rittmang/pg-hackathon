//All routes for downloading excel files

const express = require('express');
const router = express.Router();
const texas = require("../excel/texas");

router.use(function (req,res,next){
    console.log('Excel Router');
    next();
})

router.get("/texas",(req,res)=>{
    texas.download_file('http://ls.tsbde.texas.gov/csv/Dentist.csv')
        .then(response=>{
            res.send(response)
            texas.export_to_mongo()
        })
        .catch(error=>{
            res.send(error)
        })

})

module.exports = router;