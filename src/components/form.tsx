import { FormField } from "@/types/types";

interface FormProps {
  fields: FormField[];
}

export default async function Form({ fields }: FormProps) {
  return (
    <div className="flex flex-row items-center rounded-lg m-5 lg:h-20 bg-gray-300">
        <form>
            
        </form>
    </div>
  );
}
