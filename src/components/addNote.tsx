"use client";

import Form from "./form";
import { createNote } from "@/actions/createNote";
import { getAddNoteForm } from "@/graphql/queries/forms";
import useSWR from "swr";
import LoadingSpinner from "./loadingSpinner";

const fetcher = (query: string) =>
  fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((data) => data.data);

const AddNote = () => {
  const { data, error } = useSWR(getAddNoteForm, fetcher);

  const submitHandler = (formData: FormData) => {
    createNote(formData).then((result) => {
      if (result?.error) console.log(error);
    });
  };

  if (error) return <div>Error loading form</div>;
  if (!data)
    return (
      <div className="w-full h-full flex content-center justify-center">
        <LoadingSpinner />
      </div>
    );
  const formFields = data?.form?.formFields;

  if (!formFields) {
    return <div>Form fields not found</div>;
  }

  return <Form formFields={formFields} submitCallback={submitHandler} />;
};

export default AddNote;
