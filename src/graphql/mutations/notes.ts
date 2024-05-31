export const createNoteMutation = `
  mutation createNoteForUser($content: String!, $category: String!) {
    createNoteForUser(content: $content, category: $category) {
      id
      content
      category
    }
  }
`;

export const deleteNoteMutation = `
  mutation deleteNote ($id: String!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

export const updateNoteMutation = `
  mutation updateNote ($id: String!, $content: String!, $category: String!) {
    updateNote(id: $id, content: $content, category: $category) { 
      id
    }
  }`;
