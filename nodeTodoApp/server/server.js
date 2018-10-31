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
    }, (e) => {
        res.status(400).send(e)
    })
})
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        console.log(e)
        res.status(400).send(e)
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

module.exports = {
    app: app
}