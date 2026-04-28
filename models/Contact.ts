import mongoose from "mongoose";

//Oldway
// const ContactSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       maxlength: [100, "Name cannot exceed 100 characters"],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       trim: true,
//       lowercase: true,
//       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
//     },
//     subject: {
//       type: String,
//       required: [true, "Subject is required"],
//       trim: true,
//       maxlength: [200, "Subject cannot exceed 200 characters"],
//     },
//     message: {
//       type: String,
//       required: [true, "Message is required"],
//       trim: true,
//       maxlength: [1000, "Subject cannot exceed 1000 characters"],
//     },
//     status: {
//       type: String,
//       enum: ["new", "read,replied"],
//       default: "new",
//     },
//   },
//   { timestamps: true },
// );


//New Way with zod
const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [100, "Name cannot exceed 100 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      //match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Subject cannot exceed 1000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "read","replied"],
      default: "new",
    },
  },
  { timestamps: true },
);

export const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
