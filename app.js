var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var where = require("lodash.where");

mongoose.connect('mongodb://localhost/reyhoon', {useNewUrlParser: true});

app.use(bodyParser.json());
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
	author: 'علی',
	// rates
	quality: 3, // a number between 0-5
	packaging: 2,
	deliveryTime: 3,
	text: 'خیلی بد مزه بود اه اه'

});

var foo1 = new Food({
	_id: new mongoose.Types.ObjectId(),
	name:'همبرگر',
	price:'28000', // price of this food in Tomans
	description:'گوشت کاهو نان', // optional
	foodSet:'غذای اصلی' // set of this food like kabab, khorak, salad

});
var foo2 = new Food({
  _id: new mongoose.Types.ObjectId(),
  name:'همبرگر داون تاون',
  price:'25000', // price of this food in Tomans
  description:'گوجه, پنیر, ریحون', // optional
  foodSet:'غذای اصلی'// set of this food like kabab, khorak, salad

});
var foo3 = new Food({
  _id: new mongoose.Types.ObjectId(),
  name:'فرنچ تست',
  price:'225000', // price of this food in Tomans
  description:'تست بدمزه', // optional
  foodSet:'صبحانه' // set of this food like kabab, khorak, salad

});
var foo4 = new Food({
  _id: new mongoose.Types.ObjectId(),
  name:'آب معدنی',
  price:'2000', // price of this food in Tomans
  description:'', // optional
  foodSet:'نوشیدنی' // set of this food like kabab, khorak, salad

});
var foo5 = new Food({
  _id: new mongoose.Types.ObjectId(),
  name:'نوشابه',
  price:'5000', // price of this food in Tomans
  description:'', // optional
  foodSet:'نوشیدنی' // set of this food like kabab, khorak, salad

});

var cat1 = new Category({
	_id: new mongoose.Types.ObjectId(),
	name:'فست فود'

});
var cat2 = new Category({
  _id: new mongoose.Types.ObjectId(),
  name:'غذتی ایرانی'

});
var cat3 = new Category({
  _id: new mongoose.Types.ObjectId(),
  name:'ایتالیایی'

});

var cat4 = new Category({
  _id: new mongoose.Types.ObjectId(),
  name:'فرنگی'

});

var cat5 = new Category({
  _id: new mongoose.Types.ObjectId(),
  name:'دریایی'

});


var add = new Address({
	_id: new mongoose.Types.ObjectId(),
	city: 'تهران', // e.g. Tehran
	area: 'انقلاب', // e.g. Keshavarz Blvd,
	addressLine:'خیابان ولیعصر نرسیده به میدان ولیعصر' // full address text

});

// var res = new Restaurant({
// 	_id: new mongoose.Types.ObjectId(),
// 	name:'دی نایت',
// 	logo:'../Images/DayNight.png', // src of logo image
// 	openingTime:14, // time of opening
// 	closingTime:23, // time of closing
// 	averageRate:3, // average of comments rate
// 	address: add,
// 	categories:[cat1,cat2,cat3,cat4,cat5], // array of food categories. e.g. fastfood or irani
// 	foods:[foo1,foo2,foo3,foo4,foo5], // array of food categories. e.g. fastfood or irani
// 	comments:[com]

// });

// cat1.save().then(result =>{
// 	console.log(result);
// })
// .catch(err => console.log(err));
// cat2.save().then(result =>{
//   console.log(result);
// })
// .catch(err => console.log(err));
// cat3.save().then(result =>{
//   console.log(result);
// })
// .catch(err => console.log(err));
// cat4.save().then(result =>{
//   console.log(result);
// })
// .catch(err => console.log(err));
// cat5.save().then(result =>{
//   console.log(result);
// })
// .catch(err => console.log(err));


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
try{
app.get('/api/restaurant', function(req, res){
  
	if(Object.keys(req.query).length !== 0){
    Restaurant.getRestaurants(req.query,function(err, restaurants){
       if(err) {
           console.log(err);
       }
       res.json(restaurants);
     
    });
}
else{
    Restaurant.getRestaurants(0,function(err, restaurants){
       if(err) {
           console.log(err);
       }
       res.json(restaurants);
     
    });

}


});
}
    catch(err){
           console.log(err);
    
   }



   

app.get('/api/restaurant/DownTown', function(req, res){
    Restaurant.getDownTown(function(err, restaurants){
       if(err) {
           throw err;
       }

       res.json(restaurants);
    });
});


app.get('/api/restaurant/Ario', function(req, res){
    Restaurant.getArio(function(err, restaurants){
       if(err) {
           throw err;
       }

       res.json(restaurants);
    });
});

app.get('/api/restaurant/DayNight', function(req, res){
    Restaurant.getDayNight(function(err, restaurants){
       if(err) {
           throw err;
       }

       res.json(restaurants);
    });
});



app.get('/api/restaurant/DownTown/comments', function(req, res){
    Restaurant.getDownTownComment(function(err, comments){
       if(err) {
           throw err;
       }

       res.json(comments);
    });
});


app.get('/api/restaurant/Ario/comments', function(req, res){
    Restaurant.getArioComment(function(err, comments){
       if(err) {
           throw err;
       }

       res.json(comments);
    });
});

app.get('/api/restaurant/DayNight/comments', function(req, res){
    Restaurant.getDayNightComment(function(err, comments){
       if(err) {
           throw err;
       }

       res.json(comments);
    });
});






app.get('/api/food', function(req, res){
    Food.getFoods(function(err, foods){
       if(err) {
           throw err;
       }

       res.json(foods);
    });
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




app.post('/api/restaurant', (req, res) => {
  var restaurant = req.body;
  Restaurant.addRestaurant(restaurant, (err, restaurant) => {
    if(err){
      throw err;
    }
    res.json(restaurant);
  });
});



app.post('/api/restaurant/DownTown/comments', (req, res) => {
  var restaurant = req.body;
  Restaurant.addDownTownRestaurant(restaurant, (err, restaurant) => {
    if(err){
      throw err;
    }
    res.json(restaurant);
  });
});


app.post('/api/restaurant/DayNight/comments', (req, res) => {
  var restaurant = req.body;
  Restaurant.addDayNightRestaurant(restaurant, (err, restaurant) => {
    if(err){
      throw err;
    }
    res.json(restaurant);
  });
});

app.post('/api/restaurant/Ario/comments', (req, res) => {
  var restaurant = req.body;
  Restaurant.addArioRestaurant(restaurant, (err, restaurant) => {
    if(err){
      throw err;
    }
    res.json(restaurant);
  });
});




app.listen(5000);
console.log('Running on port 5000...');