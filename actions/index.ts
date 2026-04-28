"use server";

import { dbConnect } from "@/lib/db";
import { Contact } from "@/models/Contact";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

//Server Actions

export async function createContact(formData: FormData) {
  try {
    await dbConnect();

    //Checks

    const name = formData?.get("name") as string;
    const email = formData?.get("email") as string;
    const subject = formData?.get("subject") as string;
    const message = formData?.get("message") as string;

    if (!name || !email || !subject || !message) {
      return {
        status: "fail",
        data: {
          message: "All fields are mandatory",
        },
      };
    }

    const contact = await Contact.create({
      name: name.trim() as string,
      email: email.trim() as string,
      subject: subject.trim() as string,
      message: message.trim() as string,
    });
    revalidatePath("/contacts");
    return {
      status: "success",
      data: {
        message: "Contact created successfully!",
        contact: JSON.parse(JSON.stringify(contact)),
      },
    };
  } catch (error) {
    return {
      status: "error",
      data: {
        message: String(error),
      },
    };
  }
}

export async function getAllContacts() {
  try {
    dbConnect();
    // lean convert mongo object to a readable object
    const response = await Contact.find({}).sort("createdAt:-1").lean();
    return response?.map((contact) => ({
      ...contact,
      _id: contact?._id.toString(),
      createdAt: contact?.createdAt,
      updatedAt: contact?.updatedAt,
    }));
  } catch (error) {
    return {
      status: "error",
      data: {
        message: String(error),
      },
    };
  }
}

export async function updateContact(contactId: string, status: string) {
  try {
    await dbConnect();
    await Contact?.findByIdAndUpdate(contactId, { status });
    revalidatePath("/contacts");
    //revalidateTag("contact-stats-key")
    return { status: "success" };
  } catch (error) {
    console.log("Error updating contact status");
    return {
      status: "error",
      error: JSON.parse(JSON.stringify(error)),
    };
  }
}

//TODO: invalidateTag is not properly working, do a investigation
// Server Action with a Cache-Tags, this cache will revalidate later by using this key "contact-stats-key"
// export async function getContactStats() {
//   const getCachedStats = unstable_cache(
//     async () => {
//       await dbConnect();
//       const total = await Contact.countDocuments();
//       const newCount = await Contact.countDocuments({ status: "new" });
//       const readCount = await Contact.countDocuments({ status: "read" });
//       const repliedCount = await Contact.countDocuments({ status: "replied" });

//       return { total, newCount, readCount, repliedCount };
//     },
//     ["contact-stats-key"],
//     { tags: ["contact-stats-key"] },
//   );

//   return getCachedStats();
// }

export async function getContactStats() {
  try {
    await dbConnect();
    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: "new" });
    const readCount = await Contact.countDocuments({ status: "read" });
    const repliedCount = await Contact.countDocuments({ status: "replied" });
    return { total, newCount, readCount, repliedCount };
  } catch (error) {
    console.log("Error updating contact status");
    return {
      status: "error",
      error: JSON.parse(JSON.stringify(error)),
    };
  }
}
