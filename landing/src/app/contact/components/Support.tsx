import { BiBasket } from "react-icons/bi";
import { BsGear } from "react-icons/bs";

export default function Support() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="flex md:flex-row flex-col justify-center items-center my-[15rem]">
        <div className="max-w-[40rem] py-8 px-24 flex flex-col justify-center items-center md:border-r-2 border-0 border-neutral-200">
          <BiBasket size={50} color="#1447e6" />
          <p className="text-coal-1 text-[1.5rem] mt-4 font-black">
            Sales Support
          </p>
          <p className="text-bright-coal text-[0.9rem] text-center mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            esse harum minus unde at beatae praesentium similique voluptatibus
            quos quisquam!
          </p>
        </div>
        <div className="max-w-[40rem] py-8 px-24 flex flex-col justify-center items-center">
          <BsGear size={50} color="#1447e6" />
          <p className="text-coal-1 text-[1.5rem] mt-4 font-black">
            Sales Support
          </p>
          <p className="text-bright-coal text-[0.9rem] text-center mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            esse harum minus unde at beatae praesentium similique voluptatibus
            quos quisquam!
          </p>
        </div>
      </div>
    </div>
  );
}
