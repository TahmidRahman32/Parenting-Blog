import { connectDB } from "@/lib/connectDb";
import { NextResponse } from "next/server";
export const GET = async (request, { params }) => {
   const db = await connectDB();
   const bookmarkCollection = await db.collection("bookmark");
   try {
      const myBookmark = await bookmarkCollection.find({ email: params.email }).toArray();
       return NextResponse.json( {myBookmark});
   } catch (error) {
     return NextResponse.json({ massage: "something wrong" }, { status: 400 });
   }
};
