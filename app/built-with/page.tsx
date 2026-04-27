"use client"
import { useRouter } from "next/navigation";

export default function page() {
const router = useRouter();

  return (
    <div>
      <div>
        <span className="text-sm md:text-lg font-normal">
        Built with: Next.JS <span className="font-bold">Server Actions</span> &{" "}
        <span className="font-bold">
          Cache Handling (Revalidate Path & Revalidate Tag), Form
          integration{" "}
        </span>
      </span>
      </div>

     <div>
         <button onClick={()=>router?.back()}>Back</button>
     </div>
    </div>
  );
}
