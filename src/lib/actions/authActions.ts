"use server";

import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { connectDB } from "../mongodb";
import mongoose from "mongoose";

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    await connectDB();
    const user = await User.findOne({ email: data.email });
    if (user) {
      return { error: "An account Already exists" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await User.create({
      _id: new mongoose.Types.ObjectId().toString(),
      ...data,
      password: hashedPassword,
      authMethod: "credentials",
    });
    return { success: "User created successfully" };
  } catch (error: any) {
    console.error(error);
    return { error: "User creation failed", details: error.message };
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    return { success: "logged in successfully" };
  } catch (error: any) {
    console.error(error);
    return { error: `Login failed please check your email and password` };
  }
};

export const socialLogin = async (provider: string) => {
  await signIn(provider, { redirectTo: "/todos" });
};
