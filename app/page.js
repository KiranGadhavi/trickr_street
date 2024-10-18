// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/sign-in">
        <button className="bg-blue-700">Get started</button>
      </Link>
    </div>
  );
}
