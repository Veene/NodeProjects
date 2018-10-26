var {MongoClient, ObjectID} = require('mongodb')

var uriString = 'mongodb://localhost:27017/TodoApp'
MongoClient.connect(uriString, (err, db) => {
    if(err) {
      return console.log('unable to connect to mongodb server')
    } 
    console.log('connected to MongoDB!')

    //findOneAndDelete (BEST one because it returns the .value with all the info from object just like .pop())
    // db.collection('Todos').findOneAndDelete({completed: false}).then(result => {
    //     console.log(JSON.stringify(result))
    // })
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5bd27c001daf896f01094cc2")
    }, {
        //need these update OPERATORS ($set, $inc (all can be found on mongodb update operators DOCUMENTATION))
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result)
    })

    // db.close();
});