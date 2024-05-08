import { createNote } from "@/actions/createNote";
import { FormFieldType, NoteType } from "@/types/types";

type ComponentMap = {
  [key: string]: (
    label: string,
    value: string,
    options: { label: string; value: string }[]
  ) => JSX.Element;
};

interface FormProps {
  formFields: FormFieldType[];
}

export default async function Form({ formFields }: FormProps) {
  const selectMenu = (
    name: string,
    label: string,
    options: { label: string; value: string }[]
  ) => (
    <>
      <label htmlFor={label}>{label}</label>
      <input type="select" value={""} name={name}>
        <option id={label} value="">
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </input>
    </>
  );

  const textArea = () => {
    return <div></div>;
  };
  const componentMap: ComponentMap = {
    select: selectMenu,
    textarea: textArea,
  };


  return (
    <div className="flex flex-row items-center rounded-lg m-5 lg:h-20 bg-gray-300">
      <form action={createNote}>
        {formFields.map((field) => {
          const options = field?.options ? JSON.parse(field.options) : "";
          return componentMap[field.type](field.name, field.label, options);
        })}
      </form>
    </div>
  );
}
