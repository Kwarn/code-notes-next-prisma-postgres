export const getAddNoteForm = `
{
   form(formName: "createNote") {
    formFields {
      id
      label
      name
      options
      type
    }
    id
    name
  }
}
 `;
