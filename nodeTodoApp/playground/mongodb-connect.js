

var uriString = 'mongodb+srv://veene:legolas1@cluster0-u4yid.mongodb.net/test?retryWrites=true'

var MongoClient = require('mongodb').MongoClient
var test = require('assert');
MongoClient.connect(uriString, function(err, db) {
  test.equal(null, err);
// MongoClient.connect(uriString, (err, db) => {
//     if(err) {
//         return console.log('unable to connect to mongodb server', err)
//     }mongodb://localhost:27017/test
//     console.log('connected to MongoDB server')

    db.close();
});

// MongoClient.connect(uriString, function(err, client) {
//     // const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     if(err) {
//         return console.log('unable to connect to mongodb server', err)
//     }
//     console.log('connected to MongoDB server')
//     client.close();
//  });