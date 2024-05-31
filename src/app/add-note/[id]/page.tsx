import { getForm } from "@/actions/getForm";
import { getNote } from "@/actions/getNote";
import { updateNote } from "@/actions/updateNote";
import Form from "@/components/form";
import { FormFieldType } from "@/types/types";
import { redirect } from "next/navigation";

export default async function EditNotePage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const form = await getForm();
  const note = await getNote(params.id);

  if (!note || !form) return redirect("/notes"); // TODO: add error toast when note not found

  const prepopulatedFormFields = form.formFields.map(
    (field: FormFieldType) => ({
      ...field,
      defaultValue: note[field.name],
    }),
  );

  const submit = async (formData: FormData) => {
    "use server";
    const result = await updateNote(formData, params.id);
    if (result?.success) redirect(`/notes?noteId=${result.noteId}`); // TODO: add toasts to success and failed scenarios
  };

  return (
    <div className="w-full h-screen">
      <h1 className="text-white">Notes</h1>
      <div className="flex flex-row w-full">
        {form && (
          <Form formFields={prepopulatedFormFields} submitCallback={submit} />
        )}
      </div>
    </div>
  );
}
