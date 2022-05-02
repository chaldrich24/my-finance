import {ApolloServer, gql} from 'apollo-server';

const typeDefs = gql`
    type User {
        email: String
        password: String
    }

    type Query {
        users: [User]
    }
`;

const users = [
    {
        email: 'dog',
        password: 'animal'
    }
];

const resolvers = {
    Query: {
        users: () => users,
    }
};

const server = new ApolloServer ({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Server is running at ${url}`);
});