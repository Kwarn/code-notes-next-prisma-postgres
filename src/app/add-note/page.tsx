import Form from "@/components/form";
import { getAddNoteForm } from "@/graphql/queries/forms";

export default async function AddNotePage() {
  let form;
  try {
    const response = await fetch("http://localhost:3000/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: getAddNoteForm,
      }),
      cache: "no-store", // TODO: here while developing to avoid caching side effects while debugging
    });
    const { data } = await response.json();
    form = data?.form;
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
