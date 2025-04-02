"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Devices from "../../../public/devices.png";
import Browser from "../../../public/browser.png";
import Tabs from "../../../public/images.png";

export default function Showing() {
  const [activeView, setActiveView] = useState("devices");

  return (
    <div className="flex justify-start flex-col items-center md:mt-[30rem] mt-[10rem] py-[5rem] h-[58rem] max-w-[1440px] mx-auto">
      <h5 className="bg-neutral-100 w-fit px-4 py-2 mt-[8rem] rounded-4xl tracking-wider font-black text-blue-700">
        Speed Meets Simplicity
      </h5>
      <h1 className="font-black text-[2rem] text-white mt-4 capitalize text-center max-w-[40rem]">
        Experience seamless performance with an intuitive interface.
      </h1>
      <div>
        <div className="text-white mt-12 flex justify-center items-center md:gap-12 gap-4 mb-12">
          <button
            onClick={() => setActiveView("devices")}
            className={`bg-blue-700 ${
              activeView === "devices" ? "bg-blue-900" : "bg-blue-700"
            } hover:bg-blue-900 text-white px-8 py-2 rounded-3xl cursor-pointer`}
          >
            Devices
          </button>
          <button
            onClick={() => setActiveView("browser")}
            className={`bg-blue-700 ${
              activeView === "browser" ? "bg-blue-900" : "bg-blue-700"
            } hover:bg-blue-900 text-white px-8 py-2 rounded-3xl cursor-pointer`}
          >
            Browser
          </button>
          <button
            onClick={() => setActiveView("phone")}
            className={`bg-blue-700 ${
              activeView === "phone" ? "bg-blue-900" : "bg-blue-700"
            } hover:bg-blue-900 text-white px-8 py-2 rounded-3xl cursor-pointer`}
          >
            Phone
          </button>
        </div>
        <div className="text-white mt-4 flex justify-center">
          <AnimatePresence mode="wait">
            {activeView === "devices" && (
              <motion.div
                key="devices"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute"
              >
                <Image src={Devices} alt="devices" width={800} height={500} />
              </motion.div>
            )}
            {activeView === "browser" && (
              <motion.div
                key="browser"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute"
              >
                <Image src={Browser} alt="browser" width={800} height={500} />
              </motion.div>
            )}
            {activeView === "phone" && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute"
              >
                <Image src={Tabs} alt="phone" width={700} height={500} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
