var mongoose = require('mongoose');

//Categoty Schema
var categorySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name:String
});

var Category = module.exports = mongoose.model('Category', categorySchema); //permits access from outside

// Get Category
module.exports.getCategories = function(callback, limit){
    Category.find(callback).limit(limit);
}
