var mongoose = require('mongoose');

var coloradoSchema  = mongoose.Schema({
    LastName : {
        type: String
    },
    FirstName : {
        type: String
    },
    MiddleName : {
        type: String
    },
    Suffix : {
        type: String
    },
    EntityName : {
        type: String
    },
    FormattedName : {
        type: String
    },
    Attention : {
        type: String
    },
    AddressLine1 : {
        type: String
    },
    AddressLine2 : {
        type: String
    },
    City : {
        type: String
    },
    State : {
        type: String
    },
    County : {
        type: String
    },
    MailZipCode : {
        type: String
    },
    MailZipCodep4 : {
        type: String
    },
    LicenseType : {
        type: String
    },
    Subcategory : {
        type: String
    },
    LicenseNumber : {
        type: String
    },
    LicenseFirstIssueDate : {
        type: String
    },
    LicenseLastRenewedDate : {
        type: String
    },
    LicenseExpirationDate : {
        type: String
    },
    LicenseStatusDescription : {
        type: String
    },
    Specialty : {
        type: String
    },
    Title : {
        type: String
    },
    Degrees : {
        type: String
    },
    CaseNumber : {
        type: String
    },
    ProgramAction : {
        type: String
    },
    DisciplineEffectiveDate : {
        type: String
    },
    DisciplineCompleteDate : {
        type: String
    },
    field29 : {
        type: String
    }
});

var Colorado = module.exports = mongoose.model('Colorado', coloradoSchema,);



module.exports.getColorado = function(callback,limit){
    //console.log(callback);
    Colorado.find(callback).limit(limit);
    console.log("In model function");
}

module.exports.getColoradoByLICId = function(lic_id,callback){
    console.log("In model function");
    Colorado.findOne({'LicenseNumber': lic_id},callback);
}

/*module.exports.getTexasByName = function(fname,lname,callback){
    Book.findOne({},callback);
}*/