var mongoose = require('mongoose');

var massachusettSchema  = mongoose.Schema({

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

var Massachusett = module.exports = mongoose.model('Massachusett', massachusettSchema);

// Get Book

module.exports.getMass = function(callback,limit){
    Massachusett.find(callback).limit(limit);
}

module.exports.getMassByLICId = function(lic_id,callback){
    Massachusett.findOne({'license_no': lic_id},callback);
}

/*module.exports.getTexasByName = function(fname,lname,callback){
    Book.findOne({},callback);
}*/