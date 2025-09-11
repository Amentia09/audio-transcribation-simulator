import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
import { createContext } from './graphql/context.js';


const app = new ApolloServer({ typeDefs, resolvers });
const port = 4040;

const { url } = await startStandaloneServer(app, {
    listen: { port: port },
    context: createContext,
  });
  console.log(`Server ready at: ${url}`);