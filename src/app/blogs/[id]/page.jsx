import BlogCard from "@/components/Blog/BlogCard";

const getBlog = async (id) => {
   const res = await fetch(`https://dev.to/api/articles/${id}`);
   const data = await res.json();
   return data;
};

const blogDetails = async ({ params }) => {
   const blog = await getBlog(params.id);

   return (
      <div>
         <BlogCard Blog={blog}></BlogCard>
      </div>
   );
};

export default blogDetails;
