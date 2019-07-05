var mongoose = require('mongoose');


    var mongoose = require('mongoose');
    var Comment = require('./Comment'),
        commentSchema = mongoose.model('Comment').schema;

    var Food = require('./Food'),
        foodSchema = mongoose.model('Food').schema;

    var Category = require('./Category'),
        CategorySchema = mongoose.model('Category').schema;

    var Address = require('./Address'),
        AddressSchema = mongoose.model('Address').schema;


//Restaurant Schema
var restaurantSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name:String,
	logo:String, // src of logo image
	openingTime:Number, // time of opening
	closingTime:Number, // time of closing
	averageRate:Number, // average of comments rate
	address: AddressSchema,
	categories:[CategorySchema], // array of food categories. e.g. fastfood or irani
	foods:[foodSchema],
	comments:[commentSchema]
});

var Restaurant = module.exports = mongoose.model('Restaurant', restaurantSchema); //permits access from outside

// Get Restaurant
module.exports.getRestaurants = function(query,callback){
	if(query){
		var cnt=0;
	

       Restaurant.find(query,callback);
  
	}
	else
		Restaurant.find(callback);
    
}
