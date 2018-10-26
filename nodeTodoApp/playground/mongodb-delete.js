// var MongoClient = require('mongodb').MongoClient
// var ObjectID = require('mongodb').ObjectID
var {MongoClient, ObjectID} = require('mongodb')

var uriString = 'mongodb://localhost:27017/TodoApp'
MongoClient.connect(uriString, (err, db) => {
    if(err) {
      return console.log('unable to connect to mongodb server')
    } 
    console.log('connected to MongoDB!')

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result)=> {
    //     console.log(result)
    // })
    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(JSON.stringify(result))
    // })

    //findOneAndDelete (BEST one because it returns the .value with all the info from object just like .pop())
    // db.collection('Todos').findOneAndDelete({completed: false}).then(result => {
    //     console.log(JSON.stringify(result))
    // })
    db.collection('Users').deleteMany({location: 'Toronto'}).then(result => {
        console.log(JSON.stringify(result))
    })

    // db.close();
});