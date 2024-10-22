import { connectDB } from "@/lib/connectDb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
   const db = await connectDB();
   const bookmarkCollection = await db.collection("bookmark");
   try {
      const resp = await bookmarkCollection.deleteOne({ _id: new ObjectId(params.id) });
      return NextResponse.json({ massage: "delete successfully", response: resp }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ massage: "something wrong" }, { status: 400 });
   }
};
