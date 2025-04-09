import CountUp from "@/app/global/CountUp";
import Statistics from "@/app/data/Statistics";

export default function Trusted() {
  return (
    <div className="flex flex-col justify-center items-center mt-[2rem] py-32 max-w-[1440px] mx-auto">
      <h1 className="text-[3rem] max-w-[60rem] text-center text-white-1 font-black tracking-tight leading-[3.5rem] capitalize">
        We are trusted by the best companies in the world.
      </h1>

      <div className="flex justify-between items-center w-full pt-20 px-12">
        {Statistics.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="">
              <CountUp
                from={0}
                to={stat.number}
                direction="up"
                duration={1}
                className="text-6xl font-black text-white-1"
              />
              <span className="text-6xl font-black text-white-1">
                {stat.mark}
              </span>
            </div>
            <p className="text-white-1 py-2 text-[0.8rem]">{stat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
