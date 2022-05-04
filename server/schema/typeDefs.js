const {gql} = require('apollo-server');

const typeDefs = gql`
    type User {
        _id: ID,
        email: String,
        costs: [Cost]
    }

    type Cost {
        _id: ID,
        description: String,
        date: String,
        amount: Float,
        category: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(email: String!, password: String!): Auth
        addCost(description: String!, date: String!, amount: Float!, category: String!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`

module.exports = typeDefs;

