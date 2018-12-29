import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

//THE FIVE SCALAR TYPES - String, Boolean, Int, Float, ID

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

//Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments(query: String): [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation {
        createUser(data: CreateUserInput): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput): Post!
        createComment(data: CreateCommentInput): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }
    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }
    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
    Mutation: {
        createUser(parent,args,ctx,info) {
            const emailTaken = users.some((user) => user.email === args.data.email)
            if(emailTaken) {
                throw new Error('email is already in use')
            }
            const one = {
                name:'Philadelphia'
            }
            const two = {
                population: 1500000,
                ...one
            }
            const user = {
                id: uuidv4(),
                ...args.data
            }
            users.push(user)
            return user
            // console.log(args)
        },
        deleteUser(parent, args, ctx, info) {
            const userIndex = users.findIndex((user) => user.id === args.id)
            if(userIndex === -1) {
                throw new Error('User not Found')
            }
            const deletedUsers = users.splice(userIndex, 1)
            posts = posts.filter((post) => {
                const match = post.author === args.id
                //if match means post by that author needs to be deleted, so all comments on that post need to be deleted too
                if(match) {
                    comments = comments.filter((comment) => comment.post !== post.id)
                }
                return post.author !== args.id //return !match
            })
            comments = comments.filter((comment) => comment.author !== args.id)
            return deletedUsers[0]
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)
            if(!userExists) {
                throw new Error('user not found')
            }
            const post = {
                id: uuidv4(),
                ...args.data
            }
            posts.push(post)
            return post
        },
        createComment(parent, args, ctx, info) {
            const postExists = posts.some((post) => post.id === args.data.post)
            if(!postExists){
                throw new Error('post not found')
            }
            const postPublished = posts.filter((post) => post.id === args.data.post)[0].published
            console.log(postPublished)
            if(!postPublished){
                throw new Error('post not published')
            }
            const userExists = users.some((user) => user.id === args.data.author)
            if(!userExists) {
                throw new Error('user not found')
            }
            const comment = {
                id: uuidv4(),
                ...args.data
            }
            comments.push(comment)
            return comment
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id === parent.author)
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.post === parent.id)
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => post.author === parent.id)
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => comment.author === parent.id)
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => user.id === parent.author)
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => post.id === parent.post)
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