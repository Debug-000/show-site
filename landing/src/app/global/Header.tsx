interface HeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <div className="bg-neutral-100 clip-path h-fit rounded-[1.5rem] max-w-[1440px] mx-auto">
      <div className="flex flex-col justify-between items-center md:p-[8rem] p-[2rem]">
        <h1 className="text-[3rem] font-black tracking-tight leading-[3.5rem] capitalize">
          {title}
        </h1>
        <p className="max-w-[40rem] text-center mt-4">{description}</p>
      </div>
    </div>
  );
}
