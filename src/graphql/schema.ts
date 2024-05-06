export const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Note {
    id: ID!
    category: String!
    content: String!
    createdAt: String!
  }

  type Query {
    users: [User]!
    notes: [Note]
  }
`;
