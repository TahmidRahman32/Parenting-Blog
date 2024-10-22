import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./../components/Shared/NavBar";
import Footer from "@/components/Shared/Footer";
import AuthProvider from "@/services/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
   src: "./fonts/GeistVF.woff",
   variable: "--font-geist-sans",
   weight: "100 900",
});
const geistMono = localFont({
   src: "./fonts/GeistMonoVF.woff",
   variable: "--font-geist-mono",
   weight: "100 900",
});

export const metadata = {
   title: "Parenting Blog",
   description: "Parenting Blogs Ai related",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <AuthProvider>
               <NavBar />
               <div>{children}</div>
               <Footer></Footer>
               <ToastContainer />
            </AuthProvider>
         </body>
      </html>
   );
}
