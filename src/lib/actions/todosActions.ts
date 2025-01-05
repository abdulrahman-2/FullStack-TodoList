"use server";

import User from "@/models/User";
import { connectDB } from "../mongodb";
import Todo from "@/models/Todo";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

const checkUserExists = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const fetchUserTodos = async (userId: string) => {
  try {
    await connectDB();
    await checkUserExists(userId);
    const todos = await Todo.find({ userId }).lean();
    return todos;
  } catch (error) {
    console.error("Error fetching user todos:", error);
    return [];
  }
};

export const addTodo = async (
  userId: string,
  todoData: { title: string; completed?: boolean; priority?: string }
) => {
  const { title, completed = false, priority = "medium" } = todoData;

  try {
    await connectDB();
    if (!title) {
      throw new Error("Title is required");
    }
    const user = await checkUserExists(userId);
    // Create a new todo
    const todo = new Todo({
      _id: new mongoose.Types.ObjectId(),
      title,
      completed,
      priority,
      userId: user._id,
    });

    await todo.save();

    revalidatePath("/todos");

    return { success: "Todo added successfully" };
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return { error: error.message };
    } else {
      console.error("Error adding todo:", error);
      return { error: "Failed to add todo" };
    }
  }
};

export const updateTodo = async (
  userId: string,
  todoId: string,
  todoData: { title?: string; completed?: boolean; priority?: string }
) => {
  try {
    await connectDB();
    await checkUserExists(userId); // Validate user

    const { title, completed, priority } = todoData;
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return { error: "Todo not found" };
    }

    if (title !== undefined) {
      todo.title = title;
    }
    if (completed !== undefined) {
      todo.completed = completed;
    }
    if (priority !== undefined) {
      todo.priority = priority;
    }

    await todo.save();
    revalidatePath("/todos");
    return { success: "Todo updated successfully" };
  } catch (error) {
    console.error("Error updating todo:", error);
    return { error: "Failed to update todo" };
  }
};

export const deleteTodo = async (userId: string, todoId: string) => {
  try {
    await connectDB();
    await checkUserExists(userId); // Validate user

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return { error: "Todo not found" };
    }

    await Todo.findByIdAndDelete(todoId);
    revalidatePath("/todos");
    return { success: "Todo deleted successfully" };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return { error: "Failed to delete todo" };
  }
};

export const deleteAllTodo = async (userId: string) => {
  try {
    await connectDB();
    await checkUserExists(userId); // Validate user

    await Todo.deleteMany({ userId });
    revalidatePath("/todos");
    return { success: "All todos deleted successfully" };
  } catch (error) {
    console.error("Error deleting todos:", error);
    return { error: "Failed to delete todos" };
  }
};
