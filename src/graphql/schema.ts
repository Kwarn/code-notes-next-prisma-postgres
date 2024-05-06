export const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type SelectMenuOption {
    label: String!
    value: String!
  }

  type Field {
    name: String!
    label: String!
    type: String!
    options: [SelectMenuOption] 
  }

  type Form {
    name: String
    fields: [Field!]!
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
