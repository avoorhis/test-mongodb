var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require('path');

router.get('/', function(req, res) {
    console.log('req.session:')
    console.log(req.session)
    //req.flash('success', 'This is a flash message using the express-flash module.');
    res.render('index', {
        title: 'HOME',
        user: req.user,    
        hostname: req.hostname, // 
    });
    console.log({ message: 'hooray! welcome to my api!' });   
});
//
//
//
router.get('/list_users_file', function (req, res) {
   //console.log(__dirname)
   console.log(req.query)
   if(req.query.file == 'users'){
    var file_path = path.join(process.cwd(),'public','data','users.json')
   }else{
    var file_path = path.join(process.cwd(),'public','data','test_data.json')
   }
   
   //
   fs.readFile( file_path, 'utf8', function (err, data) {
      if(err){
        console.log(err)
      }else{
        console.log( data );
        res.end( data );
      }
   });
})
router.get('/list_users', function (req, res) {
   //console.log(__dirname)
   
   var file_path = path.join(process.cwd(),'public','data','users.json')
   MC.connect(mongoURI, { useNewUrlParser: true }, function(err, client) {
        if(err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
            req.flash('fail', 'Could not connect to MongoDB:Atlas.');
            return
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
router.get('/retrieve_mongo_data', function (req, res) {
   //console.log(__dirname)
   
   
   MC.connect(mongoURI, { useNewUrlParser: true }, function(err, client) {
        if(err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
            req.flash('fail', 'Could not connect to MongoDB:Atlas.');
            return
        }else{
            console.log('Connected...');
            //var collections = {}
            var collections = ['user','project','dataset']
            ALL_DATA['user']    = []  
            ALL_DATA['project']    = []  
            ALL_DATA['dataset']    = []  
            cursors = []
            for(i in collections){
                
                 
                cursors.push(client.db("test").collection(collections[i]).find());
                //console.log('cursor');
                //console.log(cursor);
                // cursor.forEach(function(doc){         
//                     //console.log(doc)        
//                     ALL_DATA[collections[i]].push(doc)                
//                 })
            }
            for(i in cursors){
                console.log('coll1 '+collections[i])
                cursors[i].forEach(function(doc){         
                    //console.log(doc)      
                    console.log('coll2 '+collections[i])  
                    ALL_DATA[collections[i]].push(doc)                
                },function(err){
                    console.log('coll3 '+collections[i])
                })
            }
            //PROJECT_LOOKUP
            //USER_LOOKUP
                      
           
        }
            
   });
   res.redirect("/");
})
//
//
router.get('/show_data', function(req, res) {   
   console.log("in show");
   console.log('ALL_DATA')
   console.log(ALL_DATA)
   //res.redirect("/");
   res.send(ALL_DATA);
   //res.send('Page Pattern Match');
});
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