import { createNote } from "@/actions/createNote";
import { FormFieldOptionsType, FormFieldType } from "@/types/types";

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
      <>
        <label htmlFor={label}>{label}</label>
        <select name={name}>
          <option id={label}>Select an option</option>
          {_options.map((option: FormFieldOptionsType) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    );
  };

  const textArea = () => {
    return <div></div>;
  };

  const componentMap: ComponentMap = {
    select: selectMenu,
    textarea: textArea,
  };

  return (
    <div className="flex flex-row items-center rounded-lg m-5 slg:h-20 bg-gray-300">
      <form action={createNote}>
        {formFields.map((field) => {
          const options = field?.options ? JSON.parse(field.options) : null;
          return componentMap[field.type](field);
        })}
      </form>
    </div>
  );
}
