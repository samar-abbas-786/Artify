import { ApolloServer } from "apollo-server";

import { typeDefs } from "../GraphQL/typeDefs.js";
import { resolvers } from "../GraphQL/Resolvers/painting.js";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
const port = 5000;
apolloServer.listen({ port }).then((res) => {
  console.log(`Apollo server is runnig at ${res.url}`);
});
