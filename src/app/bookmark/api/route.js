import { connectDB } from "@/lib/connectDb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
   const allBookmark = await request.json();
   const db = await connectDB();
   const bookmarkCollection = await db.collection("bookmark");
   try {
      const bookmark = await bookmarkCollection.insertOne(allBookmark);
      return NextResponse.json({ massage: "bookmark successfully" }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ massage: "something wrong" }, { status: 400 });
   }
};
