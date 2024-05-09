"use client";
import { useFormStatus } from "react-dom";

interface ClientButtonProps {
  defaultText: string;
  pendingText: string;
}

export default function ClientButton({
  defaultText,
  pendingText,
}: Readonly<ClientButtonProps>) {
  const { pending } = useFormStatus();
  return <button type="submit">{pending ? pendingText : defaultText}</button>;
}
