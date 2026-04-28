"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createContact } from "@/actions";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { status, data } = await createContact(formData);

      toast.success(data?.message, { position: "top-center" });

      setIsSubmitting(false);
      router.push("/contacts");
    } catch (err) {
      setIsSubmitting(false);
      const errorMsg =
        err instanceof Error ? err?.message : "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="contact-form" className="space-y-6" action={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Subject</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                className="min-h-30"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full hover:cursor-pointer hover:bg-gray-300 hover:text-black">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
