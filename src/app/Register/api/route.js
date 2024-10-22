import { connectDB } from "@/lib/connectDb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export const POST = async (req) => {
   const userInfo = await req.json();
   try {
      const db = await connectDB();
      const userCollection = await db.collection("user");
      const exist = await userCollection.findOne({ email: userInfo.email });
      if (exist) {
         return NextResponse.json({ massage: "user created" }, { status: 304 });
      }
      const hashedPassword = bcrypt.hashSync(userInfo.password, 14);
      await userCollection.insertOne({ ...userInfo, password: hashedPassword });
      return NextResponse.json({ massage: "user created" }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ massage: "something wrong", error }, { status: 500 });
   }
};
