"use client";

import Image from "next/image";
import { useState } from "react";
import Banner from "../../../public/browser.png";

export default function Header() {
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText("npx create labrago").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex lg:flex-row flex-col justify-between items-center md:p-[8rem] p-[2rem]">
      <div className="lg:w-[50%] w-full flex flex-col gap-4">
        <h5 className="bg-white-1 w-fit px-4 py-2 rounded-4xl tracking-wider font-black text-blue-700">
          LabraGo CMS with Go Lang
        </h5>
        <h1 className="text-[3rem] text-coal-1 font-black tracking-tight leading-[3.5rem] capitalize">
          Build modern websites with the most customizable{" "}
          <span className="text-blue-700">Headless CMS</span>
        </h1>
        <p className="text-bright-coal">
          The open-source Headless CMS for developers that makes API creation
          easy, and supports your favorite frameworks. Customize and host your
          projects in the cloud or on your own servers.
        </p>

        <div className="grid grid-cols-8 gap-2 w-full max-w-[23rem] mt-4">
          <input
            id="npm-install"
            type="text"
            className="col-span-6 rounded-lg p-2.5 bg-coal-1 text-white-1"
            value="npx create labrago"
            disabled
            readOnly
          />
          <button
            onClick={copyText}
            className="cursor-pointer col-span-2 text-white bg-blue-700 hover:bg-blue-900 outline-none font-medium rounded-lg text-sm py-2.5 items-center justify-center"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <div className="relative lg:w-[60%] w-full h-[30rem]">
        <Image
          src={Banner}
          alt="Home-Banner"
          className="absolute top-0 right-[10%] lg:right-[-10%] lg:w-[55rem] w-full h-[30rem] object-contain box drop-shadow"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
