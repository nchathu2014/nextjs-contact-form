"use server";

import { dbConnect } from "@/lib/db";
import { Contact } from "@/models/Contact";
import { cacheTag } from "next/cache"; // ✅ new stable API
import { updateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//  use cache directive instead of unstable_cache
export async function getAllContacts() {
  "use cache"; // replaces unstable_cache wrapper
  cacheTag("all-contacts-key"); //  replaces tags: ["all-contacts-key"]

  try {
    await dbConnect();
    const response = await Contact.find({}).sort({ createdAt: -1 }).lean();
    return response?.map((contact) => ({
      ...contact,
      _id: contact._id.toString(),
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
    }));
  } catch (error) {
    return [];
  }
}

export async function getContactStats() {
  "use cache";
  cacheTag("contact-stats-key");

  try {
    await dbConnect();
    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: "new" });
    const readCount = await Contact.countDocuments({ status: "read" });
    const repliedCount = await Contact.countDocuments({ status: "replied" });
    return { total, newCount, readCount, repliedCount };
  } catch (error) {
    return { total: 0, newCount: 0, readCount: 0, repliedCount: 0 };
  }
}

export async function createContact(formData: FormData) {
  try {
    await dbConnect();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !subject || !message) {
      return { status: "fail", data: { message: "All fields are mandatory" } };
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    updateTag("contact-stats-key"); // burst data cache
    updateTag("all-contacts-key"); // burst data cache
    revalidatePath("/contacts"); // burst page cache

    // return {
    //   status: "success",
    //   data: {
    //     message: "Contact created successfully!",
    //     contact: JSON.parse(JSON.stringify(contact)),
    //   },
    // };
  } catch (error) {
    return { status: "error", data: { message: String(error) } };
  }

  redirect("/contacts");
}

export async function updateContact(contactId: string, status: string) {
  try {
    await dbConnect();
    await Contact.findByIdAndUpdate(contactId, { status });

    updateTag("contact-stats-key");
    updateTag("all-contacts-key");
    revalidatePath("/contacts");

    return { status: "success" };
  } catch (error) {
    return { status: "error", data: { message: String(error) } };
  }
}
