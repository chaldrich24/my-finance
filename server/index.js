import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

const PORT = process.env.PORT || 4000;
const app = express();

const startServer = async () => {
   
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({app: app});

    app.use((req, res) => {
        res.send('Hollow')
    })
}

startServer();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});


