export default function Loading() {
   // You can add any UI inside Loading, including a Skeleton.
   return (
      <div className="min-h-[calc(100vh-362px)] flex items-center justify-center">
         <div className="text-2xl">
            <span className="loading loading-ring loading-xs"></span>
            <span className="loading loading-ring loading-sm"></span>
            <span className="loading loading-ring loading-md"></span>
            <span className="loading loading-ring loading-lg"></span>
         </div>
      </div>
   );
}
