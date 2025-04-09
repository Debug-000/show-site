import Wrapper from "../global/Wrapper";
import Header from "./components/Header";
import Message from "./components/Message";
import Support from "./components/Support";

export default function Contact() {
  return (
    <Wrapper>
      <div className="bg-neutral-100 clip-path h-fit rounded-[1.5rem] max-w-[1440px] mx-auto">
        <Header />
      </div>

      <Support />
      <Message />
    </Wrapper>
  );
}
