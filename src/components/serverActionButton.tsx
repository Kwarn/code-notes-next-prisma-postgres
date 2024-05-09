interface ButtonProps {
  id: string;
  text: string;
  callback: ((formData: FormData) => void) | undefined;
}

export default function Button({ id, text, callback }: Readonly<ButtonProps>) {
  return (
    <form action={callback}>
      <input
        name="id"
        className="hidden"
        defaultValue={id}
      />
      <button type="submit">{text}</button>
    </form>
  );
}
