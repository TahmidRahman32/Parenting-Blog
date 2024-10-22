"use client";
import Image from "next/image";

import loginSvg from "../../../public/icons/login.jpg";
import Link from "next/link";
import { Bounce, toast } from "react-toastify";
import SocialLogin from "@/components/SocialLogin/SocialLogin";

const Register = () => {
   const handleSinUp = async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;
      const userInfo = {
         name: name,
         email: email,
         password: password,
      };

      try {
         const resp = await fetch(`${process.env.NEXT_SITE_BASE_URI}Register/api`, {
            method: "POST",
            headers: {
               "content-type": "application/json",
            },
            body: JSON.stringify(userInfo),
         });

         if (!resp.ok) {
            {
               toast.error(resp.statusText, {
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
            return;
         } else if (resp.status === 200) {
            toast.success("🦄 Wow so easy! user created", {
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
            form.reset();
         }
      } catch (error) {
         return [];
      }
   };

   return (
      <div className="max-w-7xl mx-auto min-h-[calc(100vh-370px)]">
         <div className="flex items-center">
            <div className="wax-w-xl mx-auto">
               <div className="">
                  <Image width={480} height={120} src={loginSvg} alt="logo"></Image>
               </div>
            </div>
            <div className="flex-1 mx-auto max-w-xl shadow-xl rounded-lg border my-8 pt-6 px-6 pb-2">
               <h2 className="font-primaryN pb-3 text-xl font-bold">Sign Up to your account</h2>
               <SocialLogin></SocialLogin>
               <div className="divider">or</div>
               <div>
                  <form onSubmit={handleSinUp}>
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
                     </div>
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                     </div>
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <div className="flex items-center justify-between">
                           <div className="">
                              <label className=" cursor-pointer flex gap-2 my-2">
                                 <input type="checkbox" defaultChecked className="checkbox text-blue-500" />
                                 <span className="">Remember me</span>
                              </label>
                           </div>
                           <label className="label ">
                              <a href="#" className="label-text-alt link link-hover text-sm hover:text-blue-800">
                                 Forgot password?
                              </a>
                           </label>
                        </div>
                     </div>
                     <div className="form-control mt-6 hover:scale-105 decoration transition">
                        <button class="before:ease relative h-10 rounded-xl w-full overflow-hidden border border-[#A08D6D] bg-[#A08D6D] text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-[#A08D6D] hover:before:-translate-x-[505px] text-xl font-primaryN">
                           <span relative="relative z-10">Register</span>
                        </button>
                     </div>
                  </form>
               </div>
               <div className="mt-5">
                  <p className="">
                     You have Already account ?{" "}
                     <Link href={"/Login"} className="text-blue-600 font-semibold">
                        Sign In here
                     </Link>{" "}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Register;
