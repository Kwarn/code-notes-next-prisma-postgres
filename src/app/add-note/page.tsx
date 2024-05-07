import Form from "@/components/form";
import { getAddNoteForm } from "@/graphql/queries/getAddNoteForm";

export default async function AddNotePage() {
  let form;
  try {
    const response = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: getAddNoteForm,
      }),
      cache: "no-store", // TODO
    });
    const { data } = await response.json();
    if (data && data.form) {
      form = data.form;
    }
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
