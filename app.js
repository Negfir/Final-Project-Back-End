var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var where = require("lodash.where");

mongoose.connect('mongodb://localhost/reyhoon', {useNewUrlParser: true});


var Comment = require('./models/Comment');
var Restaurant = require('./models/Restaurant');
var Food = require('./models/Food');
var Category = require('./models/Category');
var Address = require('./models/Address');


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
	text: 'sdffsf '

});

var foo = new Food({
	_id: new mongoose.Types.ObjectId(),
	name:'پیتزا',
	price:'25000', // price of this food in Tomans
	description:'گوجه, پنیر, ریحون', // optional
	foodSet:'Fast Food' // set of this food like kabab, khorak, salad

});

var cat = new Category({
	_id: new mongoose.Types.ObjectId(),
	name:'Italian'

});

var add = new Address({
	_id: new mongoose.Types.ObjectId(),
	city: 'تهران', // e.g. Tehran
	area: 'ولیعصر', // e.g. Keshavarz Blvd,
	addressLine:'Valiasr street' // full address text

});

var res = new Restaurant({
	_id: new mongoose.Types.ObjectId(),
	name:'داون تاون',
	logo:'dkfn', // src of logo image
	openingTime:3, // time of opening
	closingTime:2, // time of closing
	averageRate:7, // average of comments rate
	address: add,
	categories:[cat], // array of food categories. e.g. fastfood or irani
	foods:[foo], // array of food categories. e.g. fastfood or irani
	comments:[com]

});

res.save().then(result =>{
	console.log(result);
})
.catch(err => console.log(err));


app.get('/api/tetData',(req,res)=>{
	const customers =[
		{id: 1, firstName: 'John', lastName: 'Doe'}
	];
	res.json(customers);
});
//res.json(customers);


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

app.get('/api/restaurant', function(req, res){
	if(Object.keys(req.query).length !== 0){
    Restaurant.getRestaurants(req.query,function(err, restaurants){
       if(err) {
           throw err;
       }
       res.json(restaurants);
     
    });
}
else{
    Restaurant.getRestaurants(0,function(err, restaurants){
       if(err) {
           throw err;
       }
       res.json(restaurants);
     
    });

}



});

app.get('/api/food', function(req, res){
    Food.getFoods(function(err, foods){
       if(err) {
           throw err;
       }

       res.json(foods);
    });
});

app.get('/api/category', function(req, res){
    Category.getCategories(function(err, categories){
       if(err) {
           throw err;
       }
       res.json(categories);
    });
});

app.get('/api/address', function(req, res){
    Address.getAddresses(function(err, addresses){
       if(err) {
           throw err;
       }
       res.json(addresses);
    });
});

app.listen(5000);
console.log('Running on port 5000...');