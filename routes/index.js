var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'MATTRESS MOVERS' });
  console.log('hey, we responded with our index page');
});

var getFAQ = router.get('/faq', function(req, res) {
	console.log('responding with faq page');
	res.send('here is our faq page');
})

module.exports = router;
