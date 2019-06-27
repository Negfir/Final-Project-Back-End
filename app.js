var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reyhoon', {useNewUrlParser: true});


var Comment = require('./models/Comment');

//var state = mongoose.model('comment');
// Connect to Mongoose
var db = mongoose.connection;

/*
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
*/

var com = new Comment({
	_id: new mongoose.Types.ObjectId(),
	author: 'Gholam',
	// rates
	quality: 3, // a number between 0-5
	packaging: 2,
	deliveryTime: 3,
	text: 'sdffsf ',

});

com.save().then(result =>{
	console.log(result);
})
.catch(err => console.log(err));

//GET REQUEST
app.get('/', function(req, res){
    res.send('Please use /api/books or /api/genres');
});

app.get('/api/comments', function(req, res){
    Comment.getComments(function(err, comments){
       if(err) {
           throw err;
       }
       res.json(comments);
    });
});

app.listen(3000);
console.log('Running on port 3000...');