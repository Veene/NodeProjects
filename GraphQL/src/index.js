import { GraphQLServer } from 'graphql-yoga';

//THE FIVE SCALAR TYPES - String, Boolean, Int, Float, ID

//Demo user data
const users = [{
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
const posts = [{
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
const comments = [{
    id:'1',
    text:'thats great1',
    author: '1'
},{
    id:'2',
    text:'thats great2',
    author: '1'
},{
    id:'3',
    text:'thats great3',
    author: '2'
},{
    id:'4',
    text:'thats great4',
    author: '3'
},]

//Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
    type Comment {
        id: ID!
        text: String!
    }
`

//Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            }
            return users.filter((user) => user.name.toLowerCase().includes(args.query.toLowerCase()))
        },
        posts(parent, args, ctx, info){
            if(!args.query) {
                return posts
            }
            return posts.filter((post) => post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())) 
           
        },
        comments(parent, args, ctx, info) {
            if(!args.query) {
                return comments
            }
            return comments.filter((comment) => comment.text.toLowerCase().includes(args.query.toLowerCase()))
        },
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com',
                age: 28
            }
        },
        post() {
            return {
                id: '1234',
                title: 'Title 1',
                body: 'Body 1',
                published: true
            }
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id === parent.author)
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => post.author === parent.id)
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('server is running up and running')
})