"use client";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    text: "This product is amazing! It changed my life.",
  },
  {
    id: 2,
    name: "Jane Smith",
    text: "I love the customer service. Highly recommended!",
  },
  {
    id: 3,
    name: "David Brown",
    text: "Fast, reliable, and worth every penny!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex justify-center flex-col items-center my-[30rem]">
      <h5 className="bg-neutral-100 w-fit px-4 py-2 rounded-4xl tracking-wider font-black text-blue-700">
        Speed Meets Simplicity
      </h5>
      <h1 className="font-black text-[2rem] mt-4 capitalize text-center max-w-[40rem]">
        Experience seamless performance with an intuitive interface.
      </h1>
      <div>
        <div>
          <h3>{testimonials[currentIndex].text}</h3>
          <p>- {testimonials[currentIndex].name}</p>
          <button onClick={prevTestimonial}>Previous</button>
          <button onClick={nextTestimonial}>Next</button>
        </div>
      </div>
    </div>
  );
}
