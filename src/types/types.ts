export type NoteType = {
  category: string;
  content: string;
};

export type FormFieldType = {
  name: string;
  label: string;
  type: string;
  options?: string; // json
}