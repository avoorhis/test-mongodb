var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require('path');

router.get('/', function(req, res) {
    console.log(req.session)
    res.render('index', {
        title: 'HOME',
        user: req.user,    
        hostname: req.hostname, // 
    });
    console.log({ message: 'hooray! welcome to our api!' });   
});
//
//
//
router.get('/list_users_file', function (req, res) {
   //console.log(__dirname)
   var file_path = path.join(process.cwd(),'public','data','users.json')
   fs.readFile( file_path, 'utf8', function (err, data) {
      if(err){
        console.log(err)
      }else{
        console.log( data );
        res.end( data );
      }
   });
})
router.get('/list_users_in_the_cloud', function (req, res) {
   //console.log(__dirname)
   var file_path = path.join(process.cwd(),'public','data','users.json')
   MC.connect(mongoURI, { useNewUrlParser: true }, function(err, client) {
        if(err) {
                    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }else{
           console.log('Connected...');
           collections_user = client.db("test").collection("user");
           //console.log(collections_user.find())
           var cursor = collections_user.find()
           users = {}
           cursor.forEach(function(doc){         
                
                users[doc['_id']] = doc
                
           },function(err){
             client.close()
             res.render('users', {
                title: 'User List',
                users: JSON.stringify(users),    
                hostname: req.hostname, // 
             });
           });
           
           
        }
            
   });
   //res.redirect("/");
})
//
//
//
router.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.render('users.json', {
    title: 'User List',
    user: req.user,
    
    hostname: req.hostname, // 
  });
   //res.send('Page Pattern Match');
});

//

module.exports = router;