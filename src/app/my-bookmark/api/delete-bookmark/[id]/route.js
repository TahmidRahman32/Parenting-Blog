import { connectDB } from "@/lib/connectDb";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
   const db = await connectDB();
   const bookmarkCollection = await db.collection("bookmark");
   try {
      const resp = await bookmarkCollection.deleteOne({ _id: new ObjectId(params.id) });
      return Response.json({ massage: "delete successfully", response: resp }, { status: 200 });
   } catch (error) {
      console.log(error);
      return Response.json({ massage: "something wrong" }, { status: 400 });
   }
};
