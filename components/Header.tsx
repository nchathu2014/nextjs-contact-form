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
              className="text-3xl md:text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50"
            >
              <span className="text-orange-500">R</span>elay
            </Link>
          </h1>
          <div className="text-sm">
            <span className="text-orange-600">Send</span> a message. <span className="text-orange-600">Start</span> a conversation
          </div>
        </div>
      </div>
    </nav>
  );
}
