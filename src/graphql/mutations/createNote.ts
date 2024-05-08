export const createNoteMutation = `
  mutation CreateNote($content: String!, $category: String!) {
    createNote(content: $content, category: $category) {
      id
      content
      category
    }
  }
`;
