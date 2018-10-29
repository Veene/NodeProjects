var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/todo');

var app = express();

//app.use takes middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((result)=>{
        res.send(result)
    }, (err) => {
        res.status(400).send(err)
    })
})

app.listen(3000, () => {
    console.log('server started up on Port 3000')
})
// var newUser = new User({
//     username: 'John',
//     email: 'jonny@rulz.com'
// })
// newUser.save().then((result) => {
//     console.log('saved', result)
// }, (err) => {
//     console.log('err', err)
// })