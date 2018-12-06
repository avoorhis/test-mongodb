


function mongo_connect() {
}
mongo_connect.prototype.get_all_data = function(callback) 
{
  console.log('in models get_all_data')
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
            var cursor1 = client.db("test").collection('user').find()
            cursor1.forEach(function(doc){         
                    //console.log(doc)      
                    //console.log('coll2 '+collections[i])  
                    ALL_DATA['user'].push(doc)                
            })
            var cursor2 = client.db("test").collection('project').find()
            cursor2.forEach(function(doc){         
                    //console.log(doc)      
                    //console.log('coll2 '+collections[i])  
                    ALL_DATA['project'].push(doc)                
            })
            var cursor3 = client.db("test").collection('dataset').find()
            cursor3.forEach(function(doc){         
                    //console.log(doc)      
                    //console.log('coll2 '+collections[i])  
                    ALL_DATA['dataset'].push(doc)  
                    //callback(err, ALL_DATA);              
            })
            callback(err,ALL_DATA);
            // for(i in collections){
//                 
//                  
//                 cursors.push(client.db("test").collection(collections[i]).find());
//                 //console.log('cursor');
//                 //console.log(cursor);
//                 // cursor.forEach(function(doc){         
// //                     //console.log(doc)        
// //                     ALL_DATA[collections[i]].push(doc)                
// //                 })
//             }
//             for(i in cursors){
//                 console.log('coll1 '+collections[i])
//                 cursors[i].forEach(function(doc){         
//                     //console.log(doc)      
//                     console.log('coll2 '+collections[i])  
//                     ALL_DATA[collections[i]].push(doc)                
//                 },function(err){
//                     console.log('coll3 '+collections[i])
//                 })
//             }
//             //PROJECT_LOOKUP
            //USER_LOOKUP
                      
           
        }
            
   }, function(err){
    console.log('JJJ')
    callback(err,ALL_DATA);
   });
  // connection.query(query, function (err, rows, fields) {
//     callback(err, rows);
//   });
};

module.exports = mongo_connect;
