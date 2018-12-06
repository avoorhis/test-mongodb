var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");
//const mc = require('mongodb').MongoClient;
// mc.connect(uri, function(err, client) {
//    if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//    }
//    console.log('Connected...');
//    const user_collection = client.db("test").collection("user");
//    // perform actions on the collection object
//    var myobj = { name: "Company Inc", address: "Highway 37" };
//    user_collection.insertOne(myobj, function(err, res) {
//      if (err) throw err;
//      console.log("1 document inserted");
//      client.close();
//    });
//    //client.close();
// });
router.get('/', function(req, res) {
    res.render('index', {
        title: 'HOME',
        user: req.user,    
        hostname: req.hostname, // 
    });
    console.log({ message: 'hooray! welcome to our api!' });   
});

//
router.get('/add_data', function(req, res) {
    // read data
    var file_path = path.join(process.cwd(),'public','data','test_data.json')
   fs.readFile( file_path, 'utf8', function (err, data) {
      if(err){
        console.log(err)
      }else{
        var d = JSON.parse(data)
        console.log( d.project );
       
        MC.connect(mongoURI, { useNewUrlParser: true }, function(err, client) {
               if(err) {
                    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
               }
               console.log('Connected...');
               var collections = {}
               collections.user = client.db("test").collection("user");
               collections.project = client.db("test").collection("project");
               collections.dataset = client.db("test").collection("dataset");
               for(col in collections){
                    console.log(col)
                    console.log(d[col])
                    collections[col].insertMany(d[col])
                    
               }
        //        // perform actions on the collection object
        //        var myobj = { name: "Company Inc", address: "Highway 37" };
        //        user_collection.insertOne(myobj, function(err, res) {
        //          if (err) throw err;
        //          console.log("1 document inserted");
        //          client.close();
        //        });
               
        });
        res.redirect("/");
       
        
      }
   });
    console.log({ message: 'welcome to admin!' }); 
   

      
});



module.exports = router;