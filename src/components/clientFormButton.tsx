"use client";
import { useFormStatus } from "react-dom";

interface ClientFormButtonProps {
  defaultText: string;
  pendingText: string;
}

export default function ClientFormButton({
  defaultText,
  pendingText,
}: Readonly<ClientFormButtonProps>) {
  const { pending } = useFormStatus();

  return <button type="submit">{pending ? pendingText : defaultText}</button>;
}
