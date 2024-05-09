"use client";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

interface ClientButtonProps {
  defaultText: string;
  pendingText: string;
  completeCallback: () => void;
}

export default function ClientButton({
  defaultText,
  pendingText,
}: Readonly<ClientButtonProps>) {
  const { pending, data } = useFormStatus();

  useEffect(() => {
    console.log("ClientButton data: ", data); // TODO: use completeCallback to clear form after submit success
  }, [data]);
  return <button type="submit">{pending ? pendingText : defaultText}</button>;
}
