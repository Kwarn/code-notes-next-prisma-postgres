interface ButtonProps {
  id: string;
  text: string;
  action: ((formData: FormData) => void) | undefined;
}

export default function Button({ id, text, action }: Readonly<ButtonProps>) {
  return (
    <form action={action}>
      <input
        name="id"
        className="hidden"
        defaultValue={id}
      />
      <button type="submit">{text}</button>
    </form>
  );
}
