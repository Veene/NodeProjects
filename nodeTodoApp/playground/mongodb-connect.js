// var MongoClient = require('mongodb').MongoClient
// var ObjectID = require('mongodb').ObjectID
var {MongoClient, ObjectID} = require('mongodb')

var uriString = 'mongodb://localhost:27017/TodoApp'
MongoClient.connect(uriString, (err, db) => {
    if(err) {
      return console.log('unable to connect to mongodb server')
    } 
    console.log('connected to MongoDB!')
  
    // db.collection('Users').insertOne({
    //   name:'John',
    //   age: 29,
    //   location: 'Toronto'
    // }, (err, result) => {
    //   if(err) {
    //     return console.log('collection error', err)
    //   }
    //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp()))
    // })

    db.close();
});
