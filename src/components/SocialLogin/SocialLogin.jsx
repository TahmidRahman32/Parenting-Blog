"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
const SocialLogin = () => {
   const router = useRouter();
   const session = useSession();
   const searchParams = useSearchParams();
   const path = searchParams.get("redirect");

   const SocialLoginHandler = async (provider) => {
      const resp = await signIn(provider,{
         redirect: true,
         callbackUrl: path ? path: '/'
      });
      console.log(resp);
      if (session.status === "authenticated") {
         router.push("/");
      }
   };
   return (
      <div className="flex justify-center gap-3 ">
         <button onClick={() => SocialLoginHandler("google")} className=" py-2 px-5 flex gap-2 rounded border hover:shadow-lg hover:scale-105 decoration transition">
            {session.status === "loading" ? <ImSpinner9 size={25} className="animate-spin" /> : <FcGoogle size={25} />}
            <h3 className="font-primaryN font-semibold">LogIn with Google</h3>
         </button>
         <button onClick={() => SocialLoginHandler("github")} className=" py-2 px-5 flex gap-2 rounded border hover:shadow-lg hover:scale-105 decoration transition">
            {session.status === "loading" ? <ImSpinner9 size={25} className="animate-spin" /> : <ImGithub size={25} />}
            <h3 className="font-primaryN font-semibold">LogIn with GitHUb</h3>
         </button>
      </div>
   );
};

export default SocialLogin;
