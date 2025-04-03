"use client";

export default function Header() {
  return (
    <div className="flex flex-col justify-between items-center md:p-[8rem] p-[2rem]">
      <h1 className="text-[3rem] font-black tracking-tight leading-[3.5rem] capitalize">
        About Us
      </h1>
      <p className="max-w-[30rem] text-center mt-4">
        With we want to optimize the customization process so your team can save
        time when building websites.
      </p>
    </div>
  );
}
