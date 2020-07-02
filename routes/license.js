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
const arizona = require('./arizona');

router.use('/texas', texas);
router.use('/pennstate', penn);
router.use('/nevada', nevada);
router.use('/newyork', newyork);
router.use('/california', california);
router.use('/colorado', colorado);
router.use('/ohio', ohio);
router.use('/arizona', arizona);

router.use(function (req,res,next){
    console.log('License Router');
    next();
})

module.exports = router;