var mongoose = require('mongoose');

//Comment Schema
var commentSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	author: String,
	// rates
	quality: Number, // a number between 0-5
	packaging: Number,
	deliveryTime: Number,
	text: String,
	created_at: {
		type: Date,
		default: Date.now
	}
});

var Comment = module.exports = mongoose.model('Comment', commentSchema); //permits access from outside

// Get Books
module.exports.getComments = function(callback, limit){
    Comment.find(callback).limit(limit);
}
