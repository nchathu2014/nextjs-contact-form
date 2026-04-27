import mongoose from "mongoose";

const NEXT_MONGODB_URI = process.env.NEXT_MONGODB_URI || "";
let isConnected = false;

export const dbConnect = async () => {
  try {
    if (isConnected) {
      console.log("mongodb is already connected");
      return;
    }
    const db = await mongoose.connect(NEXT_MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to mongodb");
  } catch (error) {
    throw Error(
      error instanceof Error
        ? error.message
        : "Something went wring while connecting to db",
    );
  }
};
