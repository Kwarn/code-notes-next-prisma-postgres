import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-row items-center rounded-lg m-5 lg:h-20 bg-gray-300">
      <Link href={"/"}>
        <Image
          className="ml-4 rounded-lg"
          src="https://www.clipartmax.com/png/small/44-447563_notes-icon-stationery-icon-png.png"
          alt="logo"
          width="80"
          height="80"
        />
      </Link>
      <Link
        className="text-xl ml-10 rounded-xl w-max p-2 bg-white"
        href={"/notes"}
      >
        notes list
      </Link>
      <Link
        className="text-xl ml-10 rounded-xl w-max p-2 bg-white"
        href={"/add-note"}
      >
        Add note
      </Link>
    </div>
  );
}
