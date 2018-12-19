import { GraphQLServer } from 'graphql-yoga';

//THE FIVE SCALAR TYPES - String, Boolean, Int, Float, ID

//Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!

    }
`

//Resolvers
const resolvers = {
    Query: {
        id() {
            return `abc123`
        },
        name() {
            return `John`
        },
        age() {
            return 29
        },
        employed() {
            return true
        },
        gpa() {
            return null //we could return null because no exclamation mark!
        },
        title() {
            return `Boobs`
        },
        price() {
            return 3.99
        },
        releaseYear() {
            return null 
        },
        rating() {
            return null 
        },
        inStock() {
            return true
        },
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('server is running up and running')
})