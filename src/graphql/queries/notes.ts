export const getNotes = `
{
  notes {
    id
    createdAt
    category
    content
    author {
      name
    }
  }
}
 `;

export const getNote = `
  query note($id: ID!) {
    note(id: $id) {
      id
      category
      content
    }
  }
`;
