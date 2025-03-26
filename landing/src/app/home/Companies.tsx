import Image from "next/image";
import AirBNB from "../../../public/airbnb.png";
import Coinbase from "../../../public/coinbase.webp";
import LYFT from "../../../public/Lyft.png";
import Slack from "../../../public/slack.png";
import Uber from "../../../public/Uber.png";

export default function Companies() {
  return (
    <div className="flex justify-center flex-col items-center my-[7rem]">
      <h1 className="text-[1.2rem]">Trusted by</h1>
      <div className="w-full flex justify-between items-center my-[3rem] gap-4 px-8">
        <Image
          src={AirBNB}
          alt="Airbnb"
          className="w-[100px] h-[100px] mx-[2rem] grayscale-100 object-contain"
          width={100}
          height={100}
        />
        <Image
          src={Coinbase}
          alt="Coinbase"
          className="w-[100px] h-[70px] mx-[2rem] grayscale-100 object-contain"
          width={100}
          height={100}
        />
        <Image
          src={LYFT}
          alt="Lyft"
          className="w-[100px] h-[70px] mx-[2rem] object-contain grayscale-100"
          width={100}
          height={100}
        />
        <Image
          src={Slack}
          alt="Slack"
          className="w-[150px] h-[70px] mx-[2rem] object-contain grayscale-100"
          width={100}
          height={100}
        />
        <Image
          src={Uber}
          alt="Uber"
          className="w-[100px] h-[70px] mx-[2rem] object-contain grayscale-100"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
