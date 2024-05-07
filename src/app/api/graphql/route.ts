import { createSchema, createYoga } from "graphql-yoga";
import { resolvers } from "../../../graphql/resolvers";
import { typeDefs } from "../../../graphql/schema";

const { handleRequest } = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: (req) => ({
    ...req,
    prisma,
    // Add other properties to your context as needed
  }),
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
