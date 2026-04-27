import mongoose from "mongoose";
const MONGODB_URI = process.env.NEXT_MONGODB_URI || "";
let isConnected = false;

export async function dbConnect() {
  try {
    if (isConnected) {
      console.log("mongodb is already connected");
      return;
    }

    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to mongodb");
  } catch (error) {
    console.error("Failed to connect mongodb", error);
    throw error;
  }
}
