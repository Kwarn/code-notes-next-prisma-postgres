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
    author: User!
  }

  type Query {
    users: [User]!
    notes: [Note]!
    note(id: String!): Note!
    form(formName: String!): Form!
  }

  type Mutation {
    createNoteForUser(category: String!, content: String!): Note!
    updateNote(id: String!, category: String!, content: String!): Note!
    deleteNote(id: String!): Note!
  }
`;
