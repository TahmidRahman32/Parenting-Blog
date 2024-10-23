"use client";
import Image from "next/image";
import React from "react";
import NotFound from "../NotFound/NotFound";
import { PiHeartStraightFill } from "react-icons/pi";
import Link from "next/link";
import { MdBookmarkAdd } from "react-icons/md";
import { useSession } from "next-auth/react";
import { Bounce, toast } from "react-toastify";

const Blog = ({ blog }) => {
   const session = useSession();
   const { title, readable_publish_date, cover_image, published_timestamp, positive_reactions_count, description, comments_count, id, public_reactions_count, published_at } = blog;
   const BlogBookmark = async () => {
      const bookmark = {
         title: title,
         description: description,
         readable_publish_date: readable_publish_date,
         cover_image: cover_image,
         public_reactions_count: public_reactions_count,
         published_at: published_at,
         email: session.data?.user?.email,
         comments_count: comments_count,
         id: id,
      };

      const resp = await fetch(`${process.env.NEXT_SITE_BASE_URI}/bookmark/api`, {
         method: "POST",
         headers: {
            "content-type": "application/json",
         },
         body: JSON.stringify(bookmark),
      });
      if (resp.status === 200) {
         toast.success("🦄 Your Bookmark Added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
         });
      }
   };

   return (
      <div>
         <div className="shadow-xl rounded-lg h-full decoration hover:scale-105  transition relative">
            <button onClick={BlogBookmark} title="Bookmark" className="flex items-center text-2xl  mx-2 hover:bg-blue-500 overflow-hidden transition hover:scale-110 bg-blue-400 rounded-full p-2 absolute -right-6 -top-3">
               <MdBookmarkAdd className="text-[#ffffff]" />
            </button>
            <div className="max-w-sm mx-auto group hover:no-underline">
               {cover_image ? <Image width={450} height={120} alt="cover" src={cover_image} /> : <NotFound />}
               <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">{title}</h3>
                  <span>Publish Date: </span>
                  <span className="text-sm text-gray-600">{readable_publish_date}</span>
                  <p>{description}</p>
                  <hr />
                  <div className="flex justify-between ">
                     <p className="flex gap-1 items-center ">
                        {" "}
                        <PiHeartStraightFill size={25} color="#e3210a" /> <span>{positive_reactions_count}</span>
                     </p>

                     <Link href={`/blogs/${id}`}>
                        <button className="before:ease relative h-10 rounded-xl w-28 overflow-hidden border border-[#A08D6D] bg-[#A08D6D] text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-[#A08D6D] hover:before:-translate-x-40 text-xl font-primaryC">
                           <span relative="relative z-10">Details</span>
                        </button>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Blog;
