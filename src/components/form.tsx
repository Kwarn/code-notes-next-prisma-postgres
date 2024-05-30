import { createNote } from "@/actions/createNote";
import { FormFieldOptionsType, FormFieldType, NoteType } from "@/types/types";
import ClientButton from "./clientFormButton";
import { redirect } from "next/navigation";

type ComponentMap = {
  [key: string]: (field: FormFieldType) => JSX.Element;
};

type FormProps = {
  formFields: FormFieldType[];
};

export default async function Form({ formFields }: Readonly<FormProps>) {
  const selectMenu = ({
    name,
    label,
    options,
    defaultValue,
  }: FormFieldType) => {
    const _options = options && JSON.parse(options);
    return (
      <div key={name}>
        <label htmlFor={label}>{label}</label>
        <select required name={name} defaultValue={defaultValue}>
          <option id={label}>Select an option</option>
          {_options.map((option: FormFieldOptionsType) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const textArea = ({ name, label, defaultValue }: FormFieldType) => {
    return (
      <div key={name}>
        <label htmlFor={label}>{label}</label>
        <textarea
          required
          id={name}
          name={name}
          defaultValue={defaultValue}
        ></textarea>
      </div>
    );
  };

  const componentMap: ComponentMap = {
    select: selectMenu,
    textarea: textArea,
  };

  const submit = async (formData: FormData) => {
    "use server";
    const result = await createNote(formData);
    if (result?.success) redirect(`/notes?noteId=${result.noteId}`);
  };

  return (
    <div className="flex flex-row items-center rounded-lg m-5 slg:h-20 bg-gray-300">
      <form action={submit}>
        {formFields.map((field) => componentMap[field.type](field))}
        <ClientButton defaultText="Add note" pendingText="Adding note..." />
      </form>
    </div>
  );
}
