const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const dbconnection = require('./data/connectors');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();



const corsOptions = {
  origin: [process.env.ORIGIN || 'https://localhost:3001',],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

async function startApolloServer() {
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: async ({ req, res }) => {
      const token = req.cookies['token'] || '';
      return { token, res };
    },
  });

  await server.start(); // Ensure the server is started before applying middleware
  
  server.applyMiddleware({ app, path: '/graphql', cors: corsOptions });
  const port = process.env.PORT || 8000;
  app.listen({ port: port }, () => {
    console.log(`Apollo Server on port ${port}/graphql`);
  });
}

startApolloServer().catch((error) => {
  console.error('Error starting Apollo Server:', error);
});
