import Blog from "@/components/Blog/Blog";
import SectionTitle from "@/components/Shared/Section/SectionTitle";
import React from "react";
const getBlogData = async () => {
   const res = fetch("https://dev.to/api/articles?per_page=20&top=7");
   const data = (await res).json();
   return data;
};

const page = async () => {
   const blogData = await getBlogData();
  

   return (
      <div>
         <SectionTitle title={"All Patenting Blogs for Tech Related"}></SectionTitle>
         <div>
            <section className="">
               <div className="container max-w-screen-xl p-6 mx-auto space-y-6 sm:space-y-12">
                  <div className="grid justify-center grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                     {blogData?.map((blog) => (
                        <Blog key={blog.id} blog={blog}></Blog>
                     ))}
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
};

export default page;
