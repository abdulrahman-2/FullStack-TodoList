import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "./lib/mongodb";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("User not found");
          }
          const isValidPassword = await bcrypt.compare(
            (credentials?.password as string) ?? "",
            user.password as string
          );
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }
          return user;
        } catch (error) {
          console.error("Credentials authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();

        // Handle GitHub provider
        if (account?.provider === "github") {
          const existingUser = await User.findOne({ email: profile?.email });
          if (!existingUser) {
            const newUser = new User({
              _id: profile?.id,
              name: profile?.name,
              email: profile?.email,
              authMethod: "github",
            });
            await newUser.save();
            user.id = newUser._id;
          } else {
            user.id = existingUser._id;
          }
        }

        // Handle Google provider
        if (account?.provider === "google") {
          const existingUser = await User.findOne({ email: profile?.email });
          if (!existingUser) {
            const newUser = new User({
              _id: profile?.sub,
              name: profile?.name,
              email: profile?.email,
              authMethod: "google",
            });
            await newUser.save();
            user.id = newUser._id;
          } else {
            user.id = existingUser._id;
          }
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    },
    ...authConfig.callbacks,
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
