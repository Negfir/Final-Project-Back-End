var mongoose = require('mongoose');


    var mongoose = require('mongoose'),
        Comment = require('./Comment'),
        commentSchema = mongoose.model('Comment').schema;


//Restaurant Schema
var restaurantSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name:String,
	logo:String, // src of logo image
	openingTime:Number, // time of opening
	closingTime:Number, // time of closing
	averageRate:Number, // average of comments rate
	//address: AddressSchema,
	//categories:[CategorySchema], // array of food categories. e.g. fastfood or irani
	//foods:[foodSchema],
	comments:[commentSchema]
});

var Restaurant = module.exports = mongoose.model('Restaurant', restaurantSchema); //permits access from outside

// Get Restaurant
module.exports.getRestaurants = function(callback, limit){
    Restaurant.find(callback).limit(limit);
}
