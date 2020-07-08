const express = require('express');
const router = express.Router();
// /api/license/<state>s
const texas = require('./texas');
const penn = require('./pennstate');
const nevada = require('./nevada');
const newyork = require('./newyork');
const california = require('./california');
const colorado = require('./colorado');
const ohio = require('./ohio');
const mass = require('./massachusetts');
const arizona = require('./arizona');
const newjersey = require('./newjersey');
const illinois = require('./illinois');
const florida = require('./florida');
const oregon = require('./oregon');
const kansas = require('./kansas');


router.use('/texas', texas);
router.use('/pennstate', penn);
router.use('/nevada', nevada);
router.use('/newyork', newyork);
router.use('/california', california);
router.use('/colorado', colorado);
router.use('/ohio', ohio);
router.use('/massachusetts', mass);
router.use('/arizona', arizona);
router.use('/newjersey', newjersey);
router.use('/illinois', illinois);
router.use('/florida', florida);
router.use('/oregon', oregon);
router.use('/kansas', kansas);



router.use(function (req,res,next){
    console.log('License Router');
    next();
})

module.exports = router;