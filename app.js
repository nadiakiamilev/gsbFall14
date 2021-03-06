var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var hogan = require("hogan.js");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

/*DB Code*/
console.log(process.env.MONGODBPROD)
var dbconnection = process.env.MONGODBPROD || 'mongodb://localhost:27017/mattressmovers'
mongoose.connect(dbconnection)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function callback() {
    console.log('MONGO RUNNING')
})

/*Set Up*/

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

var server = app.listen(3000, function() {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening', host, port)
})

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*DB*/
app.use(function(req, res, next) {
    req.db = db
    next()
})

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
exports.db = db;
