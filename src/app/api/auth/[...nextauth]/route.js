import { connectDB } from "@/lib/connectDb";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
const handle = NextAuth({
   secret: process.env.GITHUB_CLIENT_SECRET_JWT,
   session: {
      strategy: "jwt",
      maxAge: 3 * 24 * 60 * 60,
   },
   providers: [
      CredentialsProvider({
         credentials: {
            email: {},
            password: {},
         },

         async authorize(credentials) {
            const { email, password } = credentials;
            if (!email || !password) {
               return null;
            }
            const db = await connectDB();
            const currentUser = await db.collection("user").findOne({ email });
            if (!currentUser) {
               return null;
            }
            const passwordMatch = bcrypt.compareSync(password, currentUser.password);
            if (!passwordMatch) {
               return null;
            }
            return currentUser;
         },
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_SECRET_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET_API_KEY,
      }),
      GitHubProvider({
         clientId: process.env.GITHUB_CLIENT_SECRET_ID,
         clientSecret: process.env.GITHUB_CLIENT_SECRET_API_KEY,
      }),
   ],

   pages: {
      signIn: "/Login",
   },
   callbacks: {
      async signIn({ user, account }) {
         if (account.provider === "google" || account.provider === "github") {
            const { name, email, image } = user;
            try {
               const db = await connectDB();
               const userCollection = await db.collection("user");
               const userExist = await userCollection.findOne({ email });
               if (!userExist) {
                  const res = await userCollection.insertOne(user);
                  return user;
               } else {
                  return user;
               }
            } catch (error) {
               console.log(error);
            }
         } else {
            return user;
         }
      },
   },
});
export { handle as GET, handle as POST };
