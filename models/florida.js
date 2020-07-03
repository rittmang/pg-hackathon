var mongoose = require('mongoose');

var floridaSchema  = mongoose.Schema({
    proCode:{
        type: String
    },
    professionName:{
        type: String
    },
    licId:{
        type: String
    },
    expireDate:{
        type: String
    },
    originalDate: {
        type: String
    },
    rankCode:{
        type: String
    },
    licenseNumber:{
        type: String
    },
    statusEffectiveDate:{
        type: String
    },
    boardActionIndicator:{
        type: String
    },
    licenseStatusDescription:{
        type: String
    },
    lastName:{
        type: String
    },
    firstName:{
        type: String
    },
    middleName:{
        type: String
    },
    nameSuffix:{
        type: String
    },
    businessName:{
        type: String
    },
    licenseActiveStatusDescription:{
        type: String
    },
    county:{
        type: String
    },
    countyDescription:{
        type: String
    },
    mailingAddressLine1:{
        type: String
    },
    mailingAddressLine2:{
        type: String
    },
    mailingAddressCity: {
        type: String
    },
    mailingAddressState:{
        type: String
    },
    mailingAddressZipCode:{
        type: String
    },
    mailingAddressAreaCode:{
        type: String
    },
    mailingAddressPhoneNumber:{
        type: String
    },
    mailingAddressPhoneExtension:{
        type: String
    },
    practiceLocationAddressLine1: {
        type: String
    },
    practiceLocationAddressLine2:{
        type: String
    },
    practiceLocationAddressCity:{
        type: String
    },
    practiceLocationAddressState:{
        type: String
    },
    practiceLocationAddressZipCode:{
        type: String
    },
    email:{
        type: String
    },
    modCdes:{
        type: String
    },
    prescribeInd:{
        type: String
    },
    dispensingInd:{
        type: String
    },
    field36:{
        type: String
    }

});

var Florida = module.exports = mongoose.model('Florida', floridaSchema);

// Get Book

module.exports.getFlorida = function(callback,limit){
    Florida.find(callback).limit(limit);
}

module.exports.getFloridaByLICId = function(lic_id,callback){
    Florida.findOne({'licenseNumber': lic_id},callback);
}

/*module.exports.getTexasByName = function(fname,lname,callback){
    Book.findOne({},callback);
}*/