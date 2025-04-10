import Image from "next/image";
import TeamMembers from "@/app/data/TeamMembers";

export default function OurTeam() {
  return (
    <div className="flex flex-col items-center mt-[10rem] py-32">
      <h5 className="bg-neutral-100 w-fit px-4 py-2 rounded-4xl tracking-wider font-black text-blue-700">
        Team
      </h5>
      <h1 className="font-black text-[2rem] mt-4 capitalize text-center max-w-[40rem] text-coal-1">
        Creative minds behind our success.
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-[10rem]">
        {TeamMembers.map((member, index) => (
          <div key={index}>
            <Image
              src={member.image}
              alt={member.name}
              className="w-[350px] h-[450px] rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 object-cover"
            />
            <p className="text-coal-1 text-[1.5rem] mt-4 font-black">
              {member.name}
            </p>
            <p className="text-bright-coal text-[0.9rem]">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
