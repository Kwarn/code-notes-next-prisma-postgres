import { getForm } from "@/actions/getForm";
import { getNote } from "@/actions/getNote";
import Form from "@/components/form";
import { FormFieldType } from "@/types/types";

export default async function EditNotePage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const form = await getForm();
  const note = await getNote(params.id);

  const formFields = form.formFields.map((field: FormFieldType) => ({
    ...field,
    defaultValue: note[field.name],
  }));

  return (
    <div className="w-full h-screen">
      <h1 className="text-white">Notes</h1>
      <div className="flex flex-row w-full">
        {form && <Form formFields={formFields} />}
      </div>
    </div>
  );
}
