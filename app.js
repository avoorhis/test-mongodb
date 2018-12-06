var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var path = require('path');
var C = require('./config/db')
MC = require('mongodb').MongoClient;

mongoURI = "mongodb://"+C.MONGODB_USER+":"+C.MONGODB_TOKEN+"@cluster0-shard-00-00-f1ujl.mongodb.net:27017,cluster0-shard-00-01-f1ujl.mongodb.net:27017,cluster0-shard-00-02-f1ujl.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"


var app = express();
var sessionStore = new session.MemoryStore;
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());

const hostname = '127.0.0.1';
const port = process.env.PORT || 3001;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
var routes    = require('./routes/rts-index'); 
var admin     = require('./routes/rts-admin');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// view engine setup
app.set('views', path.join(__dirname, 'views'));

// ROUTES:
app.use('/', routes);
app.use('/admin', admin);
//
//
ALL_DATA = {}
//
var mongoData = require('./models/mongo');
var all_mongo_data = new mongoData();
all_mongo_data.get_all_data(function(err, results) {
    if (err)
        throw err; // or return an error message, or something
    else
    {
        console.log('XXXXX')
        console.log(results)
        console.log(ALL_DATA)
        
        
    }
})
//all_mongo_data = new mongo_connect();
//app.listen(port);
//console.log('Magic happens on port ' + port);
var server = app.listen(port, hostname, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port);   
})

//server.listen(port, hostname, () => {
//  console.log(`Server running at http://${hostname}:${port}/`);
//});

