import Companies from "../global/Companies";
import FloatingBubbles from "../global/FloatingBubble";
import Wrapper from "../global/Wrapper";
import Header from "./components/Header";
import OurStory from "./components/OurStory";
import OurTeam from "./components/OurTeam";
import Trusted from "./components/Trusted";

export default function About() {
  return (
    <Wrapper>
      <div className="bg-neutral-100 clip-path h-fit rounded-[1.5rem] max-w-[1440px] mx-auto">
        <Header />
      </div>
      <Companies />
      <OurStory />
      <div className="relative bg-blue-700 overflow-hidden">
        <FloatingBubbles />
        <div className="relative z-10">
          <Trusted />
        </div>
      </div>
      <OurTeam />
    </Wrapper>
  );
}
