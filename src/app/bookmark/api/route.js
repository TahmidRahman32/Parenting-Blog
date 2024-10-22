import { connectDB } from "@/lib/connectDb";

export const POST = async (request) => {
   const allBookmark = await request.json();
   const db = await connectDB();
   const bookmarkCollection = await db.collection("bookmark");
   try {
      const bookmark = await bookmarkCollection.insertOne(allBookmark);
      return Response.json({ massage: "bookmark successfully" }, { status: 200 });
   } catch (error) {
      console.log(error);
      return Response.json({ massage: "something wrong" }, { status: 400 });
   }
};
