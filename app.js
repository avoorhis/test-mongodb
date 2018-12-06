var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
MC = require('mongodb').MongoClient;
mongoURI = "mongodb://avoorhis:FpecgZT7J4athrA@cluster0-shard-00-00-f1ujl.mongodb.net:27017,cluster0-shard-00-01-f1ujl.mongodb.net:27017,cluster0-shard-00-02-f1ujl.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"

//const uri  = "mongodb+srv://avoorhis:FpecgZT7J4athrA@cluster0.mongodb.net/test";
//const uri  = "mongodb+srv://avoorhis:<PASSWORD>@cluster0-f1ujl.mongodb.net/test?retryWrites=true"
//const uri2 = "mongodb+srv://avoorhis:FpecgZT7J4athrA@cluster0-1q7ty.mongodb.net/test"
//db = client.test
//const mongouri = "mongodb://avoorhis:FpecgZT7J4athrA@cluster0-shard-00-00-f1ujl.mongodb.net:27017,cluster0-shard-00-01-f1ujl.mongodb.net:27017,cluster0-shard-00-02-f1ujl.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"

var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser())

const hostname = '127.0.0.1';
const port = process.env.PORT || 3001;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);
var routes    = require('./routes/rts-index'); 
var admin     = require('./routes/rts-admin');
var app       = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// view engine setup
app.set('views', path.join(__dirname, 'views'));

// ROUTES:
app.use('/', routes);
app.use('/admin', admin);
//
//
//
//app.listen(port);
//console.log('Magic happens on port ' + port);
var server = app.listen(port, hostname, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
   
})

//server.listen(port, hostname, () => {
//  console.log(`Server running at http://${hostname}:${port}/`);
//});

