"use client";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
const faqs = [
  {
    question: "What is LabraGo?",
    answer:
      "LabraGo is an open-source, Go based, Headless CMS that saves developers a lot of development time while giving them the freedom to use their favorite tools and frameworks. LabraGo also enables content editors to streamline content delivery (text, images, video, etc) across any devices.",
  },
  {
    question: "What is a Headless CMS?",
    answer:
      "A headless CMS is a back-end only content management system (CMS) built from the ground up as a content repository that makes content accessible via an API for display on any device. Headless CMS are also particularly suitable for websites designed using the Jamstack model where JavaScript, APIs, and Markup work together to make web development easier and user experiences better.",
  },
  {
    question: "What is an API?",
    answer:
      "API is the acronym for Application Programming Interface, which is a software intermediary that allows two applications to talk to each other. In case you want to connect a React application with LabraGo, we say that React is the client and LabraGo the system. Indeed, React will communicate to LabraGo, by making HTTP requests. LabraGo will then give a response back to your client. If your LabraGo application contains restaurants and you want to list them in your React application, all you need to do is to make an HTTP request to LabraGo which will take care to give you a response containing your restaurants. The API Endpoints documentation will give you all the keys in hand to interact with your LabraGo API.",
  },
  {
    question: "How do I deploy LabraGo?",
    answer:
      "LabraGo is self-hosted. It's up to you to decide where to deploy and host your LabraGo project. We have a list of deployment guides for Amazon AWS, Microsoft Azure, DigitalOcean, Google App Engine and Heroku. You can also use our 1-click deploy buttons and Docker installation. If you have any questions, feel free to ask us on our Discord server.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex justify-start items-center mt-[30rem] px-4 gap-4">
      <div className="">
        <h5 className="bg-neutral-100 w-fit px-4 py-2 rounded-4xl tracking-wider font-black text-blue-700">
          Get Help
        </h5>
        <h1 className="font-black text-[3rem] mt-4 capitalize max-w-[35rem]">
          Frequently Asked Questions
        </h1>
      </div>
      <div className="">
        {faqs.map((faq, index) => (
          <div key={index}>
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
