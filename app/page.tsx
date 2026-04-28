import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Next.JS Server Actions</h1>
          <p className="text-xl text-gray-600 max-2xl mx-auto">
            Built with: Next.JS, Shadcn UI Components, Server Actions, MongoDB
            Atlas and Cache Revalidation (By using revalidatePath() &
            revalidateTag())
          </p>
        </div>
        <div className=" flex mb-4 mx-auto justify-center item-center">
          <Button variant="outline">
            <Link href={"/contacts"}>See Contacts</Link> 
          </Button>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
