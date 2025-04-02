import { BsLightning, BsRobot } from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";

export default function KeyFeatures() {
  return (
    <div className="flex justify-center flex-col items-center md:my-[20rem] my-[10rem] max-w-[1440px] mx-auto">
      <h5 className="bg-neutral-100 w-fit px-4 py-2 rounded-4xl tracking-wider font-black text-blue-700">
        Speed Meets Simplicity
      </h5>
      <h1 className="font-black text-[2rem] mt-4 capitalize text-center max-w-[40rem]">
        Experience seamless performance with an intuitive interface.
      </h1>
      <div>
        <div className="flex justify-between lg:flex-row flex-col items-start gap-8 gap-y-24 mt-[5rem] mb-[2rem]">
          <div className="flex flex-col items-center px-4 gap-2 max-w-[30rem]">
            <div className="bg-blue-700 p-4 rounded-full text-white">
              <BsLightning size={32} />
            </div>
            <h5 className="text-blue-700 font-black mt-4">
              Lightning-Fast Performance
            </h5>
            <p className="text-center">
              Say goodbye to lag and slow load times. Our system is optimized
              for speed, ensuring smooth and responsive interactions, even when
              handling complex tasks. Whether you&apos;re multitasking or
              working on large projects, everything runs seamlessly without
              delays.
            </p>
          </div>
          <div className="flex flex-col items-center px-4 gap-2 max-w-[30rem]">
            <div className="bg-blue-700 p-4 rounded-full text-white">
              <BsRobot size={32} />
            </div>
            <h5 className="text-blue-700 font-black mt-4">
              AI-Powered Automation
            </h5>
            <p className="text-center">
              Work smarter, not harder. Our intelligent automation tools handle
              repetitive tasks for you, learning from your patterns and adapting
              to your workflow. From auto-suggestions to smart scheduling, it
              saves you time and effort, so you can focus on what truly matters.
            </p>
          </div>
          <div className="flex flex-col items-center px-4 gap-2 max-w-[30rem]">
            <div className="bg-blue-700 p-4 rounded-full text-white">
              <IoIosColorPalette size={32} />
            </div>
            <h5 className="text-blue-700 font-black mt-4">
              Minimalist & Intuitive UI
            </h5>
            <p className="text-center">
              No clutter, no confusion—just a clean, thoughtfully designed
              interface that makes navigation effortless. With a user-friendly
              layout and intuitive controls, you can accomplish tasks quickly
              and efficiently without unnecessary complexity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
