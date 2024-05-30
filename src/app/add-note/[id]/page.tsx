import Form from "@/components/form";
import { getAddNoteForm } from "@/graphql/queries/forms";
import { getNote } from "@/graphql/queries/notes";

export default async function AddNotePage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  let form;
  try {
    const formResponse = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: getAddNoteForm,
      }),
    });
    const { data: formData } = await formResponse.json();
    form = formData?.form;

    const noteResponse = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: getNote,
        variables: { id: params.id },
      }),
    });

    const { data: noteData } = await noteResponse.json();

    console.log(noteData);
  } catch (error) {
    console.error("Error fetching notes:", error);
  }

  return (
    <div className="w-full h-screen">
      <h1 className="text-white">Notes</h1>
      <div className="flex flex-row w-full">
        {form && <Form formFields={form.formFields} />}
      </div>
    </div>
  );
}
