export const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Field {
    id: ID!
    name: String!
    label: String!
    type: String!
    options: String
  }

  type Form {
    id: ID
    name: String!
    formFields: [Field!]!
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
    form(formName: String!): Form!
  }
`;
