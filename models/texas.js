var mongoose = require('mongoose');

var texasSchema  = mongoose.Schema({

    REC_TYPE : {
        type: String
    },
    LIC_ID :{
        type:Number
    },
    LIC_NBR :{
        type:Number
    },
    LIC_STA_CDE : {
        type:Number
    },
     LIC_STA_DESC  : {
         type: String
     },
     LIC_ORIG_DTE  : {
         type: Date
     },
     LIC_EXPR_DTE  : {
         type: Date
     },
     FIRST_NME  : {
         type: String
     },
     MIDDLE_NME  : {
         type: String
     },
     LAST_NME  : {
         type: String
     },
     FORMER_LAST_NME  :{
         type: String
     },
     GENDER  :{
         type: String
     },
     ADDRESS1  :{
         type: String
     },
     ADDRESS2  : {
         type: String
     },
     CITY  : {
         type: String
     },
     STATE  : {
         type: String
     },
     ZIP  :{
        type: Number
     },
     COUNTY  :  {
         type: String
     },
     COUNTRY  :  {
         type: String
     } ,
     PHONE  : {
         type: String
     },
     NOX_PERMIT_DTE  :{
         type: String
     } ,
     LEVEL_1_DTE  :{
         type: String
     } ,
     LEVEL_2_DTE  : {
         type: String
     },
     LEVEL_3_DTE  :{
         type: String
     } ,
     LEVEL_4_DTE  : {
         type: String
     } ,
     PORTABILITY  : {
         type: String
     },
     DISC_ACTION  :{
         type: String
     } ,
     PRAC_DESC  : {
         type: String
     } ,
     PRAC_TYPES  : {
         type: String
     } ,
     GRAD_YR  : {
        type: Number
     },
     SCHOOL  :  {
         type: String
     },
     BIRTH_YEAR  : {
         type: Number
     },
     SHRP_MOD  :{
         type: String
     } ,
     SPP_MOD  : {
         type: String
     }

});

var Texas = module.exports = mongoose.model('Texas', texasSchema);

// Get Book

module.exports.getTexas = function(callback,limit){
    Texas.find(callback).limit(limit);
}

module.exports.getTexasByLICId = function(lic_id,callback){
    Texas.findOne({'LIC_ID': lic_id},callback);
}

/*module.exports.getTexasByName = function(fname,lname,callback){
    Book.findOne({},callback);
}*/