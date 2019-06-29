var mongoose = require('mongoose');

//Food Schema
var foodSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name:String,
	price:Number, // price of this food in Tomans
	description:String, // optional
	foodSet:String // set of this food like kabab, khorak, salad
});

var Food = module.exports = mongoose.model('Food', foodSchema); //permits access from outside

// Get Food
module.exports.getFoods = function(callback, limit){
    Food.find(callback).limit(limit);
}
