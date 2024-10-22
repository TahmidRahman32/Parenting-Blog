"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import slider2 from "../../../public/images/banner/2.jpg";
import slider3 from "../../../public/images/banner/3.jpg";
import slider4 from "../../../public/images/banner/4.jpg";
import slider5 from "../../../public/images/banner/5.jpg";

// import required modules
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
   const sliderImg = [
      {
         id: "1",
         img: "https://i.ibb.co.com/ymz8fvR/1.jpg",
      },
      {
         id: "2",
         img: "https://i.ibb.co.com/Ws3MhyJ/2.jpg",
      },
      {
         id: "3",
         img: "https://i.ibb.co.com/4mHjXQj/3.jpg",
      },
      {
         id: "4",
         img: "https://i.ibb.co.com/LQn1TNT/4.jpg",
      },
      {
         id: "5",
         img: "https://i.ibb.co.com/Ypt6TQ6/5.jpg",
      },
   ];
   return (
      <div className="">
         <Swiper
            spaceBetween={30}
            effect={"fade"}
            pagination={{
               clickable: true,
            }}
            autoplay
            modules={[EffectFade, Pagination, Autoplay]}
            className="mySwiper h-[560px]"
         >
            <div className=" relative">
               {sliderImg.map((i,inx) => (
                  <SwiperSlide key={inx}>
                     <div className="w-full">
                        <Image
                           alt="Mountains"
                           src={i.img}
                           quality={100}
                           fill
                           sizes="100vw"
                           style={{
                              objectFit: "cover",
                           }}
                        />
                     </div>
                  </SwiperSlide>
               ))}
            </div>
         </Swiper>
         <div className="md:h-[560px] md:w-[1920px] bg-gradient-to-r from-[#02080dcc] to-[#02080dcc] absolute top-[74px] z-40">
            <div className="flex justify-center items-center h-[660px]">
               <div className="text-center">
                  <h2 className=" text-6xl font-primaryG bg-gradient-to-r from-[#511364] via-[#A08D6D] to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">Welcome to Parenting Blog </h2>
                  <Link href={"/blogs"}>
                     <button class="relative flex mx-auto mt-12 h-[50px] w-48 items-center justify-center overflow-hidden bg-[#A08D6D] rounded-full text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[#5548324d] before:duration-500 before:ease-out hover:shadow-[#5548324d] hover:before:h-56 hover:before:w-56">
                        <span class="relative z-10 text-xl font-primaryF">Read Blog</span>
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Banner;
