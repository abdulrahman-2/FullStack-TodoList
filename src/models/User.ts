import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    authMethod: {
      type: String,
      enum: ["credentials", "github", "google"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;
