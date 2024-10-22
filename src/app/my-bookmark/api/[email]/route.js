import { connectDB } from "@/lib/connectDb";
export const GET = async (request, { params }) => {
   const db = await connectDB();
   const bookmarkCollection = await db.collection("bookmark");
   try {
      const myBookmark = await bookmarkCollection.find({ email: params.email }).toArray();
       return Response.json( {myBookmark});
   } catch (error) {}
};
