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
	//_id: mongoose.Schema.Types.ObjectId,
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
	// 	var cnt=0;
	// 	for (const key in query) {
			 
	// 	console.log(query)
	// }
 //       console.log(key, query[key])
      

       Restaurant.find(query,callback);
  
	}
	else
		Restaurant.find(callback);
    
}

module.exports.getDownTown = function(callback){

       Restaurant.find({name:'داون تاون'},callback);
  
    
}

module.exports.getArio = function(callback){

       Restaurant.find({name:'آریو انقلاب'},callback);
  
    
}

module.exports.getDayNight = function(callback){

       Restaurant.find({name:'دی نایت'},callback);
  
    
}

module.exports.getDownTownComment = function(callback){

       Restaurant.find({name:'داون تاون'},{comments:1},callback);
  
    
}

module.exports.getArioComment = function(callback){

       Restaurant.find({name:'آریو انقلاب'},{comments:1},callback);
  
    
}

module.exports.getDayNightComment = function(callback){

       Restaurant.find({name:'دی نایت'},{comments:1},callback);
  
    
}

module.exports.addRestaurant = (restaurant, callback) => {
	Restaurant.create(restaurant, callback);
}

// module.exports.addDayNightRestaurant = (restaurant, callback) => {
// 	Comment.create(restaurant, callback);
// 	Restaurant.find({name:'دی نایت'},callback).comments.push("h");
// }