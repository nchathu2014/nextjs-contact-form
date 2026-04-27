"use client";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  return (
    <div>
      <div>
        <button onClick={() => router?.back()}>Back</button>
      </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Server Actions Demo</h1>
        <p className="text-xl text-gray-600 max-2xl mx-auto">
          Contact form with MongoDB and cache revalidation
        </p>
      </div>
    </div>
  );
}
