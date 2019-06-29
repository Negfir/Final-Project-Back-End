var mongoose = require('mongoose');

//Address Schema
var addressSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	city: String, // e.g. Tehran
	area: String, // e.g. Keshavarz Blvd,
	addressLine:String // full address text
});

var Address = module.exports = mongoose.model('Address', addressSchema); //permits access from outside

// Get Food
module.exports.getAddresses = function(callback, limit){
    Address.find(callback).limit(limit);
}
