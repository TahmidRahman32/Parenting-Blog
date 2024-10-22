"use client";
import Link from "next/link";
import React from "react";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Swal from "sweetalert2";

const NavBar = () => {
   const pathName = usePathname();
   const session = useSession();

   const handleSignOut = () => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Log Out",
      }).then((result) => {
         if (result.isConfirmed) {
            signOut();
            Swal.fire({
               title: "Log Out!",
               text: "Your Successfully logOut",
               icon: "success",
            });
         }
      });
   };

   return (
      <div className=" ">
         <div className="navbar container mx-auto">
            <div className="navbar-start">
               <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                     </svg>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                     <li>
                        {links.map(({ name, path }) => (
                           <Link href={path}>{name}</Link>
                        ))}
                     </li>
                  </ul>
               </div>
               <Link href={"/"}>
                  <Image height={100} width={100} src={logo}></Image>
               </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
               <ul className="menu menu-horizontal px-1 space-x-4">
                  {links.map(({ name, path }) => (
                     <Link className={pathName === path ? "font-primaryN text-blue-500 border-b-2 border-blue-500" : " font-primaryN "} href={path}>
                        {name}
                     </Link>
                  ))}
                  {pathName === "/" && (
                     <Link className={pathName === "/Register " ? "font-primaryN text-blue-500 border-b-2 border-blue-500" : " font-primaryN "} href={"/Register"}>
                        Register
                     </Link>
                  )}
                  {!session.data ? (
                     <Link className={pathName === "/Login" ? "font-primaryN text-blue-500 border-b-2 border-blue-500" : " font-primaryN "} href={"/Login"}>
                        LogIn
                     </Link>
                  ) : (
                     <button onClick={handleSignOut} className={"font-primaryN "}>
                        LogOut
                     </button>
                  )}
               </ul>
            </div>
            <div className="navbar-end">
               {session.data?.user && (
                  <div className="dropdown dropdown-end">
                     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                           <Image width={120} height={120} src={session.data?.user?.image}></Image>
                        </div>
                     </div>
                     <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow">
                        <div>
                           <div className="text-center my-8 ">
                              <div className="">
                                 <Image width={120} height={120} src={session.data?.user?.image} className="rounded-full w-10 mx-auto"></Image>
                              </div>
                              <div className="space-y-2">
                                 <h3 className="text-xl font-semibold">{session.data?.user?.name}</h3>
                                 <h5 className="text-sm font-semibold font-primaryN">{session.data?.user?.email}</h5>
                              </div>
                           </div>
                        </div>

                        <li className="mx-auto">
                           <a title="Not Working" className="">Logout</a>
                        </li>
                     </ul>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
const links = [
   {
      name: "Home",
      path: "/",
   },
   {
      name: "About",
      path: "/About",
   },
   {
      name: "Blog",
      path: "/blogs",
   },
   {
      name: "Bookmark",
      path: "/my-bookmark",
   },
];
export default NavBar;
