import { FormField } from "@/types/types";
import { ChangeEventHandler } from "react";

type ComponentMap = {
  [key: string]: (
    value: string,
    handleSelectChange: ChangeEventHandler<HTMLSelectElement>,
    options: { label: string; value: string }[]
  ) => JSX.Element;
};

interface FormProps {
  formFields: FormField[];
}

export default async function Form({ formFields }: FormProps) {
  console.log(formFields);
  const selectMenu = (
    value: string,
    handleSelectChange: ChangeEventHandler<HTMLSelectElement>,
    options: { label: string; value: string }[]
  ) => (
    <select value={""} onChange={handleSelectChange}>
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const textArea = () => {
    return <div></div>;
  };
  const componentMap: ComponentMap = {
    select: selectMenu,
    textarea: textArea,
  };

  const test = () => {};

  return (
    <div className="flex flex-row items-center rounded-lg m-5 lg:h-20 bg-gray-300">
      <form>
        {formFields.map((field) => {
          const options = field?.options ? JSON.parse(field.options) : "";
          return componentMap[field.type]("", test, options);
        })}
      </form>
    </div>
  );
}
