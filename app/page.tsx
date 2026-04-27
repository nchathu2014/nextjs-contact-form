import ContactForm from "@/components/ContactForm";

export default async function Home() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <ContactForm/>
      </div>
    </main>
  );
}
