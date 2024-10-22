"use client";
import React from "react";
import Image from "next/image";
import { MdBookmarkAdd } from "react-icons/md";
import NotFound from "../NotFound/NotFound";
import { Bounce, toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa";
import { MdComment } from "react-icons/md";
import { useRouter } from "next/navigation";

const BlogCard = ({ Blog }) => {
   const session = useSession();
   const router = useRouter();
   const { title, cover_image, public_reactions_count, published_at, tags, description, comments_count } = Blog;

   const BlogBookmark = async () => {
      const bookmark = {
         title: Blog.title,
         description: Blog.description,
         readable_publish_date: Blog.readable_publish_date,
         cover_image: Blog.cover_image,
         public_reactions_count: Blog.public_reactions_count,
         published_at: Blog.published_at,
         email: session.data.user.email,
         comments_count: Blog.comments_count,
         id: Blog.id,
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
         router.push("/my-bookmark");
      }
   };
   return (
      <div className="max-w-3xl px-6 py-16 mx-auto space-y-12">
         <article className="space-y-8">
            <div className="space-y-6">
               <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">{title}</h1>
               <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-gray-700 font-bold">
                  <p className="text-sm">5 min read • {new Date(published_at).toLocaleDateString()}</p>

                  <div className="flex gap-3">
                     <p className="flex items-center gap-2 mt-3 text-sm md:mt-0">
                        <MdComment size={20} />•{comments_count} Comment{" "}
                     </p>
                     <p className="flex gap-2 items-center mt-3 text-sm md:mt-0">
                        <FaHeart size={20} color="#e3210a" /> •{public_reactions_count} views
                     </p>
                  </div>
               </div>
            </div>

            <div className="mx-auto group hover:no-underline focus:no-underline rounded-lg  p-2">
               {cover_image ? <Image width={320} height={420} className="object-cover  w-full rounded h-44 bg-gray-500" src={cover_image} alt="cover image" /> : <NotFound />}
               <div className="flex flex-wrap py-6 gap-2 border-t border-dashed justify-between">
                  {tags?.map((tag) => (
                     <a key={tag} rel="noopener noreferrer" href="#" className="px-3 py-1 hover:underline  rounded-lg text-blue-600">
                        #{tag}
                     </a>
                  ))}
                  <button onClick={BlogBookmark} title="Bookmark" className="flex items-center text-2xl  mx-2 hover:bg-opacity-50 overflow-hidden transition hover:scale-110 bg-gray-800 rounded-full p-2  bg-opacity-30 ">
                     <MdBookmarkAdd className="" />
                  </button>
               </div>
               <hr />
               <div className="">
                  <p>{description}</p>
               </div>
            </div>
         </article>
         <div></div>
      </div>
   );
};

export default BlogCard;
