//Demo user data
let users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
},{
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
    
},{
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
    age: 27
}];
//demo posts data
let posts = [{
    id: '1',
    title: 'Test title 1',
    body: 'Test body 1',
    published: true,
    author: '1'
},{
    id: '2',
    title: 'Test title 2',
    body: 'Test body 2',
    published: false,
    author: '1'
},{
    id: '3',
    title: 'Test title 3',
    body: 'Test body 3',
    published: true,
    author: '2'
},]
//demo comments array
let comments = [{
    id:'1',
    text:'thats great1',
    author: '1',
    post: '1'
},{
    id:'2',
    text:'thats great2',
    author: '1',
    post: '1'
},{
    id:'3',
    text:'thats great3',
    author: '2',
    post: '2'
},{
    id:'4',
    text:'thats great4',
    author: '3',
    post: '3'
},]

const db = {
    users,
    posts,
    comments
}

export { db as default }