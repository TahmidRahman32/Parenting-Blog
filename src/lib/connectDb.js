const { ServerApiVersion, MongoClient } = require("mongodb");
let db;
export const connectDB = async () => {
   if (db) return db;
   try {
      const uri = process.env.MONGODB_URI_LOCAL;
      const client = new MongoClient(uri, {
         serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
         },
      });
    db =  client.db("ParentingBlog");
    return db
     
   } catch (error) {
      console.log(error);
   }
};

