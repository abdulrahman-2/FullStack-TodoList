import mongoose from "mongoose";
const cached = (global as any).mongoose || { conn: null, promise: null };
export const connectDB = async () => {
  if (cached.conn) return cached.conn;
  cached.promise =
    cached.promise ||
    mongoose
      .connect(process.env.MONGO_URI!, {
        dbName: "todos",
        bufferCommands: false,
      })
      .then(() => console.log("DB connected successfully !"))
      .catch((err) => console.log(err));
  cached.conn = await cached.promise;
  return cached.conn;
};
