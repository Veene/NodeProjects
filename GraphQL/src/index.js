import { GraphQLServer } from 'graphql-yoga';

//THE FIVE SCALAR TYPES - String, Boolean, Int, Float, ID

//Type definitions (schema)
const typeDefs = `
    type Query {
        greeting(name: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

//Resolvers
const resolvers = {
    Query: {
        grades (parent, args, ctx, info) {
            return [99, 80, 93]
        },
        add(parent, args, ctx, info) {
            if (args.numbers.length === 0) {
                return 0
            }
            if (args.numbers.length > 0) {
                return args.numbers.reduce((a, b) => {
                    return a + b
                })
            }
        },
        greeting(parent, args, ctx, info) {
            if(args.name) {
                return `Hello ${args.name}`
            } else {
                return 'Hello '
            }
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
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('server is running up and running')
})