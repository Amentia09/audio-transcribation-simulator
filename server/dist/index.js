import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { createContext } from "./graphql/context.js";
import "dotenv/config";
const port = process.env.PORT ? Number(process.env.PORT) : 4040;
console.log("✅ Loaded .env");
console.log("PORT =", process.env.PORT);
console.log("MINIO_BUCKET =", process.env.MINIO_BUCKET);
const app = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(app, {
    listen: { port },
    context: createContext,
});
console.log(`🚀 Server ready at: ${url}`);
