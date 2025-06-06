import SendMessage from "./SendMessage";

export default function Message() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center my-[15rem] py-20 px-8">
        <h5 className="bg-neutral-100 w-fit px-4 py-2 rounded-4xl tracking-wider font-black text-blue-700">
          Message
        </h5>
        <h1 className="font-black text-[2rem] mt-4 capitalize text-center max-w-[40rem] text-coal-1">
          We would love to hear from you.
        </h1>
        <SendMessage />
      </div>
    </div>
  );
}
