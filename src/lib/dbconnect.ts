import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("Missing MongoDB connection string. Set MONGODB_URI or MONGO_URI.");
  }
  if (mongoose.connection.readyState >= 1) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected Successfully: ", connection.connection.host);
    return connection;
  } catch (error) {
    console.error("MongoDB Connection Failed: ", error);
    throw error;
  }
}
