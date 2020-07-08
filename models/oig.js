var mongoose = require('mongoose');

var oigSchema  = mongoose.Schema({
    LASTNAME:{
        type: String
    },
    FIRSTNAME:{
        type: String
    },
    MIDNAME:{
        type: String
    },
    BUSNAME: {
        type: String
    },
    GENERAL:{
        type: String
    },
    SPECIALTY:{
        type: String
    },
    UPIN:{
        type: String
    },
    NPI:{
        type: String
    },
    DOB:{
        type: String
    },
    ADDRESS:{

    },
    CITY: {
        type: String
    },
    STATE: {
        type: String
    },
    ZIP:{
        type: String
    },
    EXCLTYPE: {
        type: String
    },
    EXCLDATE:{
        type: String
    },
    REINDATE:{
        type: String
    },
    WAIVERDATE:{
        type: String
    },
    WVRSTATE:{
        type: String
    }
});

var OIG = module.exports = mongoose.model('Oig', oigSchema);

// Get Book

module.exports.getOIG = function(callback,limit){
    OIG.find(callback).limit(limit);
}

module.exports.getOIGByFullName = function(firstName, lastName, callback){
    OIG.findOne({'FIRSTNAME': firstName, 'LASTNAME': lastName},callback);
}

/*module.exports.getTexasByName = function(fname,lname,callback){
    Book.findOne({},callback);
}*/




