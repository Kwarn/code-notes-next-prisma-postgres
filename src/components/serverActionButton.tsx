interface ButtonProps {
  id: string;
  text: string;
  action: (formData: FormData) => void;
  optimisticCb?: (noteId: string) => void;
}

export default function ServerActionButton({
  id,
  text,
  action,
  optimisticCb,
}: Readonly<ButtonProps>) {
  return (
    <form
      action={async (formData) => {
        const noteId = formData.get("id") as string;
        if (optimisticCb) optimisticCb(noteId); // TODO: not ideal handling, this should not be specific to notes.
        return action(formData);
      }}
    >
      <input name="id" className="hidden" defaultValue={id} />
      <button type="submit">{text}</button>
    </form>
  );
}
