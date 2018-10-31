const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

const id = '5bd65cebc21a85ac3bbf1466'

User.findById(id).then((user) => {
    if(!user) {
        console.log('user not found')
    }
    console.log('User found: ', user)
}).catch((e) => console.log(e))

// var id = '5bd8f52659c5668046be5202';
// if (!ObjectID.isValid(id)){
//     console.log('ID IS NOT VALID')
// }
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos)
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo)
// })

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('ID not found');
//     }
//     console.log('Todo by Id', todo)
// }).catch((e) => console.log(e));