"use client";

import { useState } from "react";

export default function Header() {
  const [copied, setCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText("npx create labrago").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex justify-between items-center p-[8rem]">
      <div className="w-[50%] flex flex-col gap-4">
        <h5 className="bg-white w-fit px-4 py-2 rounded-4xl tracking-wider font-black text-blue-700">
          LabraGo CMS with Go Lang
        </h5>
        <h1 className="text-[3rem] font-black tracking-tight leading-[3.5rem] capitalize">
          Build modern websites with the most customizable Headless CMS
        </h1>
        <p>
          The open-source Headless CMS for developers that makes API creation
          easy, and supports your favorite frameworks. Customize and host your
          projects in the cloud or on your own servers.
        </p>

        <div className="grid grid-cols-8 gap-2 w-full max-w-[23rem] mt-4">
          <input
            id="npm-install"
            type="text"
            className="col-span-6 border rounded-lg p-2.5 bg-[#282f3d] border-gray-600 text-gray-100"
            value="npx create labrago"
            disabled
            readOnly
          />
          <button
            onClick={copyText}
            className="cursor-pointer col-span-2 text-white bg-blue-700 hover:bg-blue-800 outline-none font-medium rounded-lg text-sm py-2.5 items-center justify-center"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <div>
        <button className="bg-[#f5f5f5] text-[#333] px-4 py-2 rounded-[0.5rem]">
          Sign Up
        </button>
      </div>
    </div>
  );
}
