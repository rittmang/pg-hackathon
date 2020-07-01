const express = require('express');
const router = express.Router();
//Root path for API

const license = require('./license');
const npi = require('./npi');


router.use('/license', license);
///api/license
router.use('/npi', npi);
///api/npi

router.use(function (req,res,next){
    console.log('API Router');
    next();
})

module.exports = router;