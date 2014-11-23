var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var router = express.Router();

/* GET users listing. */
router.get('/signup', function(req, res) {
	console.log('new sign up form')
  res.render('signup' , {title: 'Business'})
  // res.send('respond with a resource');
});

router.get('/signupConsumer', function(req, res) {
	console.log('new sign up  consumer form')
  	res.render('signupConsumer' , {title: 'Consumer'})
  // res.send('respond with a resource');
});

var Schema = mongoose.Schema

//requires all fields
var userSchema = new Schema({
    businessName : { type: String, required: true},
    name : { type: String, required: true },
    email : { type: String, required: true },
    address : { type: String, required: true }
})

var User = mongoose.model('users', userSchema)

/*GET our entire list of users signed up for internal purposes*/
var getUsers = router.get('/userlist', function(req, res) {
	var db = req.db
	console.log(db + " running")

	/*prints out all the collections we have when we ask for user list*/
	db.db.collectionNames(function (error, names) {
      if (error) {
        console.log('Error: '+ error);
      } else {
      	console.log('YO!')
        // console.log(names);
      };
    });
	console.log('collection exists?' )

	/*find all users that exist from our mongoose user model above*/
	User.find({}, {}, function(e, docs) {
		console.log(docs + " HEY CHECK OUT THE DOCS") //lets output all the people who signed up
		
		res.render('userlist', {
			"userlist" : docs
		})
	})
	console.log('why yes, yes it does.')
})


/*POST a user to our DB*/
var addUser = router.post('/adduser', function(req, res) {
	
	var db = req.db

	//gets all the input from the form
	var name = req.body.name
	var businessName = req.body.businessName
	var email = req.body.email
	var address = req.body.address

	//first need to check if this data already exists based on e-mail
	User.count({email: email}, function(err, count) {
		if (!count) {
			console.log('HEY WE R GOING TO PUT IN THIS INFORMATION')
			var tmpUser = new User({
				"name" : name,
				"businessName" : businessName,
				"email" : email,
				"address" : address
			}).save(function (err, tmpUser) {
				if (err) return console.error(err)
				else {
					// res.location('submit')
					// res.render('submit', {name: name});
					res.send('hey nice job sumbitting info');
				}
			});
		}
		else {
			//alert user that this e-mail has already been used
			console.log('Looks like you have already signed up with this e-mail!')
			res.send('Looks like you have already signed up. Thanks for the added interest!')
		}
	})
})

module.exports = router;
