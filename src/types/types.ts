export type NoteType = {
  id: string;
  category: string;
  content: string;
  createdAt: string;
};

export type AuthorType = {
  name: string;
};

export type NoteWithAuthorType = NoteType & {
  author: AuthorType;
};

export type FormFieldOptionsType = {
  label: string;
  value: string;
};

export type FormFieldType = {
  name: string;
  label: string;
  type: string;
  options?: string; // json
  defaultValue?: string;
};
