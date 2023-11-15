import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="p-3 flex gap-5">
        <Link href="/calculator" className="hover:underline">
          Calculator
        </Link>
        <Link href="/drum" className="hover:underline">
          Drum Machine
        </Link>
      </div>
    </main>
  );
}
