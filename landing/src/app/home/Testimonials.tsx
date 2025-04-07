"use client";
import Image from "next/image";
import { useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import User from "../../../public/user.png";
import { motion } from "framer-motion";
import TestimonialArray from "../data/TestimonialArray";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === TestimonialArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? TestimonialArray.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex justify-center flex-col items-center md:my-8 my-[10rem] max-w-[1440px] mx-auto px-12 text-white-1 py-[10rem]">
      <h5 className="bg-neutral-100 w-fit px-4 py-2 rounded-4xl tracking-wider font-black text-blue-700">
        They love us
      </h5>
      <h1 className="font-black text-[2rem] text-white-1 mt-4 capitalize text-center max-w-[40rem]">
        Look what developers are saying!
      </h1>
      <div className="mt-[7rem] flex justify-center items-center gap-24 w-full">
        <button
          onClick={prevTestimonial}
          className="cursor-pointer text-white-1"
        >
          <BsArrowLeftCircle size={40} />
        </button>
        <div className="flex flex-col items-center gap-4 relative">
          <p className="font-semibold mb-8 text-[10rem] text-white-1 top-[-30%] left-[20%] absolute self-start">
            &quot;
          </p>

          <Image
            src={User}
            width={100}
            height={100}
            alt="User"
            className="rounded-full border-3 brightness-0 invert-100 border-white-1 object-cover"
          />

          <p className="font-semibold text-white-1 mb-8 text-[1.1rem]">
            - {TestimonialArray[currentIndex]?.name}
          </p>

          <motion.h3
            className="md:max-w-[40rem] max-w-full h-[10rem] text-white-1 text-center font-semibold text-[1.3rem] italic"
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {TestimonialArray[currentIndex].text}
          </motion.h3>
        </div>
        <button
          onClick={nextTestimonial}
          className="text-white-1 cursor-pointer"
        >
          <BsArrowRightCircle size={40} />
        </button>
      </div>
    </div>
  );
}
