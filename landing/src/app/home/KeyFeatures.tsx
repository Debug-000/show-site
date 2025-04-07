import Features from "@/app/data/Features";

export default function KeyFeatures() {
  return (
    <div className="flex justify-center flex-col items-center md:my-[20rem] my-[10rem] max-w-[1440px] mx-auto">
      <h5 className="bg-neutral-100 w-fit px-4 py-2 rounded-4xl tracking-wider font-black text-blue-700">
        Speed Meets Simplicity
      </h5>
      <h1 className="font-black text-[2rem] mt-4 capitalize text-center max-w-[40rem] text-coal-1">
        Experience seamless performance with an intuitive interface.
      </h1>
      <div>
        <div className="flex justify-between lg:flex-row flex-col items-start gap-8 gap-y-24 mt-[5rem] mb-[2rem] text-coal-1">
          {Features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center px-4 gap-2 max-w-[30rem]"
            >
              <div className="bg-blue-700 p-4 rounded-full text-white">
                <feature.icon size={32} />
              </div>
              <h5 className="text-blue-700 font-black mt-4">{feature.title}</h5>
              <p className="text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
