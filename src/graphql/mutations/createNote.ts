export const createNoteMutation = `
  mutation createNoteForUser($content: String!, $category: String!) {
    createNoteForUser(content: $content, category: $category) {
      id
      content
      category
    }
  }
`;
