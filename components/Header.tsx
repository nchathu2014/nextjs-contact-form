import Link from "next/link";
const BASE_URL = process.env.NEXT_BASE_URL || "";

export function Header() {
  return (
    <nav className="bg-gray-50 shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center p-3">
          <h1>
            <Link
              href={BASE_URL}
              className="text-2xl md:text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50"
            >
              Contact Form
            </Link>
          </h1>
          <span className="text-sm md:text-lg font-normal">
            Built with: Next.JS{" "}
            <span className="font-bold">Server Actions</span> &{" "}
            <span className="font-bold">
              Cache Handling (Revalidate Path & Revalidate Tag), Form
              integration{" "}
            </span>
          </span>
        </div>
      </div>
    </nav>
  );
}
