import { createNote } from "@/actions/createNote";
import { FormFieldOptionsType, FormFieldType } from "@/types/types";
import { useFormStatus } from "react-dom";
import ClientButton from "./clientButton";

type ComponentMap = {
  [key: string]: (field: FormFieldType) => JSX.Element;
};

interface FormProps {
  formFields: FormFieldType[];
}

export default async function Form({ formFields }: Readonly<FormProps>) {
  const selectMenu = ({ name, label, options }: FormFieldType) => {
    const _options = options && JSON.parse(options);
    return (
      <div key={name}>
        <label htmlFor={label}>{label}</label>
        <select required name={name}>
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

  const textArea = ({ name, label }: FormFieldType) => {
    return (
      <div key={name}>
        <label htmlFor={label}>{label}</label>
        <textarea required id={name} name={name}></textarea>
      </div>
    );
  };

  const componentMap: ComponentMap = {
    select: selectMenu,
    textarea: textArea,
  };

  return (
    <div className="flex flex-row items-center rounded-lg m-5 slg:h-20 bg-gray-300">
      <form action={createNote}>
        {formFields.map((field) => componentMap[field.type](field))}
        <ClientButton defaultText="Add note" pendingText="Adding note..." />
      </form>
    </div>
  );
}
