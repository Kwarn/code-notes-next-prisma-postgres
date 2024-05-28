interface ButtonProps {
  id: string;
  text: string;
  action: (formData: FormData) => void;
  optimisticCb?: (noteId: string) => void;
}

export default function Button({
  id,
  text,
  action,
  optimisticCb,
}: Readonly<ButtonProps>) {
  return (
    <form
      action={async (formData) => {
        const noteId = formData.get("id") as string;
        if (!noteId) return;
        if (optimisticCb) optimisticCb(noteId);
        return action(formData);
      }}
    >
      <input name="id" className="hidden" defaultValue={id} />
      <button type="submit">{text}</button>
    </form>
  );
}
