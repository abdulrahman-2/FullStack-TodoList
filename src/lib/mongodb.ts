import mongoose from "mongoose";

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env"
  );
}

const connection: { isConnected?: number } = {};

export async function connectDB() {
  if (connection.isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI!);

    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}
