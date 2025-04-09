import Image from "next/image";
import SmallImg from "../../../../public/images.png";
import { MdOutlineCheck } from "react-icons/md";
import Link from "next/link";

export default function OurStory() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="flex justify-center items-center gap-40 mb-[30rem] mt-[10rem]">
        <div>
          <div className="w-[35rem] h-[30rem] relative bg-img rounded-lg">
            <Image
              src={SmallImg}
              alt="small-image"
              width={500}
              height={500}
              className="absolute right-[-20%] bottom-[-30%] w-[400px] h-[400px] drop-shadow-xl object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="max-w-[30rem]">
          <h1 className="text-coal-1 text-[3rem] font-bold leading-[3.5rem] mb-8">
            IT solutions for your business.
          </h1>
          <p className="text-bright-coal mb-8 text-[0.9rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            architecto, eum omnis corrupti maiores nostrum molestiae. Architecto
            at laboriosam consequatur.
          </p>
          <ul className="flex flex-col gap-4 mb-16">
            <li className="flex items-center gap-4 text-bright-coal text-[0.9rem]">
              <span className="bg-neutral-100 rounded-full p-3">
                <MdOutlineCheck size={18} />
              </span>
              Installation Guide
            </li>
            <li className="flex items-center gap-4 text-bright-coal text-[0.9rem]">
              <span className="bg-neutral-100 rounded-full p-3">
                <MdOutlineCheck size={18} />
              </span>
              Easy setup process
            </li>
            <li className="flex items-center gap-4 text-bright-coal text-[0.9rem]">
              <span className="bg-neutral-100 rounded-full p-3">
                <MdOutlineCheck size={18} />
              </span>
              Live call support
            </li>
            <li className="flex items-center gap-4 text-bright-coal text-[0.9rem]">
              <span className="bg-neutral-100 rounded-full p-3">
                <MdOutlineCheck size={18} />
              </span>
              Start a private group video call
            </li>
          </ul>
          <Link
            href={"/"}
            className="px-12 py-5 bg-coal-1 hover:bg-transparent text-white-1 hover:text-coal-1 border border-transparent hover:border-coal-1 transition-all delay-75 rounded-lg"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
