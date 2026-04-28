"use server";

import { dbConnect } from "@/lib/db";
import { Contact } from "@/models/Contact";
import { unstable_cache, revalidateTag,updateTag } from "next/cache";


const getCachedContacts = unstable_cache(
  async () => {
    try {
      await dbConnect(); // 
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
  },
  ["all-contacts-key"],
  { tags: ["all-contacts-key"] },
);


const getCachedStats = unstable_cache(
  async () => {
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
  },
  ["contact-stats-key"],
  { tags: ["contact-stats-key"] },
);

export async function getAllContacts() {
  return getCachedContacts();
}

export async function getContactStats() {
  return getCachedStats();
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

    //revalidateTag("contact-stats-key", "max");
    //revalidateTag("all-contacts-key", "max");
    updateTag("contact-stats-key"); // ✅ immediate expiry
    updateTag("all-contacts-key");  // ✅ immediate expiry

    return {
      status: "success",
      data: {
        message: "Contact created successfully!",
        contact: JSON.parse(JSON.stringify(contact)),
      },
    };
  } catch (error) {
    return { status: "error", data: { message: String(error) } };
  }
}

export async function updateContact(contactId: string, status: string) {
  try {
    await dbConnect();
    await Contact.findByIdAndUpdate(contactId, { status });

    //revalidateTag("contact-stats-key", "max");
   // revalidateTag("all-contacts-key", "max");

   updateTag("contact-stats-key"); // ✅ immediate expiry
    updateTag("all-contacts-key");  // ✅ immediate expiry

    return { status: "success" };
  } catch (error) {
    return { status: "error", data: { message: String(error) } };
  }
}
