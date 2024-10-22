"use client";
import Image from "next/image";
import React from "react";
import loginSvg from "../../../public/icons/login.jpg";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SocialLogin from "@/components/SocialLogin/SocialLogin";

const Login = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const path = searchParams.get("redirect");
   const handleSinIn = async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;

      const resp = await signIn("credentials", {
         email,
         password,
         redirect: true,
         callbackUrl: path ? path : "/",
      });

      if (resp.status === 200) {
         router.push("/");
      }
   };
   return (
      <div className="max-w-7xl mx-auto min-h-[calc(100vh-205px)]">
         <div className="flex items-center">
            <div className="wax-w-xl mx-auto">
               <div className="">
                  <Image width={480} height={120} src={loginSvg} alt="logo"></Image>
               </div>
            </div>
            <div className="flex-1 mx-auto max-w-xl shadow-xl rounded-lg border my-8 p-6">
               <h2 className="font-primaryN pb-3 text-xl font-bold">Welcome Back</h2>
               <SocialLogin></SocialLogin>
               <div className="divider">or</div>
               <div>
                  <form onSubmit={handleSinIn}>
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
                           <span relative="relative z-10">LogIn</span>
                        </button>
                     </div>
                  </form>
               </div>
               <div className="mt-5">
                  <p className="">
                     Don’t have an account yet?{" "}
                     <Link href={"/Register"} className="text-blue-600 font-semibold">
                        Sign up here
                     </Link>{" "}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
