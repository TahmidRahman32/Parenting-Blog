"use client";
import Image from "next/image";
import Link from "next/link";
import { RiDeleteBin5Fill } from "react-icons/ri";
import NotFound from "../NotFound/NotFound";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";

const BookmarkCard = ({ mark, dataLoaded }) => {
   const { title, description, readable_publish_date, cover_image, public_reactions_count, published_at, tags, comments_count, _id } = mark;

   const handleDelete = async (_id) => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
         if (result.isConfirmed) {
            const deleted = await fetch(`http://localhost:3000/my-bookmark/api/delete-bookmark/${_id}`, {
               method: "DELETE",
            });
            const resp = await deleted.json();
            if (resp?.response?.deletedCount > 0) {
               dataLoaded();
               toast.success("🦄 Your Bookmark Deleted", {
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
            Swal.fire({
               title: "Deleted!",
               text: "Your file has been deleted.",
               icon: "success",
            });
         }
      });
   };
   return (
      <div className="relative max-w-sm h-full mx-auto group hover:no-underline focus:no-underline  rounded-lg transition border-2 hover:scale-105  hover:border-[#A08D6D] border-opacity-30">
         {cover_image ? <Image width={450} height={120} alt="cover" src={cover_image} /> : <NotFound />}

         <div className="p-6 space-y-2">
            <Link href={`/blogs/${_id}`} className="text-2xl font-semibold group-hover:underline group-focus:underline hover:text-blue-600 " title="click and read full details">
               <h1>{title}</h1>
            </Link>
            <span className="text-xs text-gray-400">{new Date().toLocaleDateString()}</span>
            <p>{description}</p>
         </div>

         <button onClick={() => handleDelete(_id)} className="bg-[#A08D6D] absolute p-1 rounded-full -top-4 -right-2 border-2 hover:scale-105  hover:bg-gray-300">
            <RiDeleteBin5Fill size={20} className="text-black" />
         </button>
      </div>
   );
};

export default BookmarkCard;
