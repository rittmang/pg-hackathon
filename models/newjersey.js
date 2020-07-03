var mongoose = require('mongoose');

var newjerseySchema  = mongoose.Schema({

    full_name: {
        type: String
    },
    first_name: {
        type: String
    },
    middle_name: {
        type: String
    },
    last_name: {
        type: String
    },
    name_suffix: {
        type: String
    },
    profession_name: {
        type: String
    },
    license_type_name: {
        type: String
    },
    license_no: {
        type: String
    },
    issue_date: {
        type: String
    },
    expiration_date: {
        type: String
    },
    addr_line_1: {
        type: String
    },
    addr_line_2: {
        type: String
    },
    addr_city: {
        type: String
    },
    addr_state: {
        type: String
    },
    addr_zipcode: {
        type: String
    },
    addr_county: {
        type: String
    },
    addr_email: {
        type: String
    },
    license_status_name: {
        type: String
    },
    field19: {
        type: String
    }

});

var Newjersey = module.exports = mongoose.model('Newjersey', newjerseySchema);

// Get Book

module.exports.getNewJersey = function(callback,limit){
    Newjersey.find(callback).limit(limit);
}

module.exports.getNJByLICId = function(lic_id,callback){
    Newjersey.findOne({'license_no': lic_id},callback);
}

/*module.exports.getTexasByName = function(fname,lname,callback){
    Book.findOne({},callback);
}*/