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

export const getNoteById = `
query note($id: String!) {
  note(id: $id) {
    id
    category
    content
  }
}
`;
