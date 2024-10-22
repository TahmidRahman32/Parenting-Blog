"use client";
import BookmarkCard from "@/components/Bookmark/BookmarkCard";
import NotAvailable from "@/components/NotFound/NotAvailable";

import SectionTitle from "@/components/Shared/Section/SectionTitle";
import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";

const GetBookmark = () => {
   const session = useSession();
   const [bookmark, setBookmark] = useState([]);
   const dataLoaded = async () => {
      const resp = await fetch(`http://localhost:3000/my-bookmark/api/${session?.data?.user?.email}`);
      const data = await resp.json();
      setBookmark(data.myBookmark);
   };
   useEffect(() => {
      dataLoaded();
   }, [session]);

   return (
      <div>
         <SectionTitle title={"Read a your bookmark"}></SectionTitle>
         {bookmark.length > 0 ? (
            <div className="grid md:grid-cols-4 gap-8 my-8 justify-start items-center max-w-7xl mx-auto">
               {bookmark.map((mark) => (
                  <BookmarkCard key={mark._id} mark={mark} dataLoaded={dataLoaded}></BookmarkCard>
               ))}
            </div>
         ) : (
            <NotAvailable />
         )}
      </div>
   );
};

export default GetBookmark;
