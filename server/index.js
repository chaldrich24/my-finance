const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const resolvers = require('./schema/resolvers');
const typeDefs = require('./schema/typeDefs');
const { authMiddleware } = require('./utils/auth');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const PORT = process.env.PORT || 4000;

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected!!');
        return apolloServer.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server is running at ${res.url}`);
    });




