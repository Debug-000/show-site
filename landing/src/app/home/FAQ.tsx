"use client";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import FAQs from "../data/FAQs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="faqs"
      className="flex md:flex-row flex-col justify-start items-center md:my-[30rem] mt-[10rem] px-4 gap-4 max-w-[1440px] mx-auto"
    >
      <div className="">
        <h5 className="bg-neutral-100 w-fit px-4 py-2 rounded-4xl tracking-wider font-black text-blue-700">
          Get Help
        </h5>
        <h1 className="font-black text-[3rem] mt-4 text-coal-1 capitalize max-w-[35rem]">
          Frequently Asked Questions
        </h1>
      </div>
      <div className="">
        {FAQs.map((faq, index) => (
          <div key={index} className="text-coal-1">
            <h3
              onClick={() => toggleFAQ(index)}
              className="text-[1.2rem] flex items-center gap-2 cursor-pointer font-semibold mt-12 "
            >
              {openIndex === index ? <FaMinus /> : <FaPlus />}
              {faq.question}
            </h3>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[50rem] mt-8">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
