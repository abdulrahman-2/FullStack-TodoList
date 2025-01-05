import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    _id: { type: String },
    userId: { type: String, ref: "User", required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true }
);

const Todo = mongoose.models?.Todo || mongoose.model("Todo", TodoSchema);
export default Todo;
