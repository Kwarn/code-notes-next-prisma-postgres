import { createNote } from "@/actions/createNote";
import Form from "@/components/form";
import { getAddNoteForm } from "@/graphql/queries/forms";
import { redirect } from "next/navigation";

export default async function AddNotePage() {
  let form;
  try {
    const response = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: getAddNoteForm,
      }),
    });
    const { data } = await response.json();
    form = data?.form;
  } catch (error) {
    console.error("Error fetching notes:", error);
  }

  // TODO: this is duplicated in the [id] route
  const submitHandler = async (formData: FormData) => {
    "use server";
    const result = await createNote(formData);
    console.log("updateNote", result);
    if (result?.success) redirect(`/notes?noteId=${result.noteId}`);
  };

  return (
    <div className="w-full h-screen">
      <h1 className="text-white">Notes</h1>
      <div className="flex flex-row w-full">
        {form && (
          <Form formFields={form.formFields} submitCallback={submitHandler} />
        )}
      </div>
    </div>
  );
}
