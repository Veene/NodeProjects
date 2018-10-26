// var MongoClient = require('mongodb').MongoClient
// var ObjectID = require('mongodb').ObjectID
var {MongoClient, ObjectID} = require('mongodb')

var uriString = 'mongodb://localhost:27017/TodoApp'
MongoClient.connect(uriString, (err, db) => {
    if(err) {
      return console.log('unable to connect to mongodb server')
    } 
    console.log('connected to MongoDB!')
    
    db.collection('Users').find().toArray().then((docs) => {
        console.log(`Todos count: ${JSON.stringify(docs)}`);
    }, (err) => {
        console.log('unable to fetch todos', err)
    })

    // db.close();
});
