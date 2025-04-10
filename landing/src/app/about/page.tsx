import Companies from "../global/Companies";
import FloatingBubbles from "../global/FloatingBubble";
import Header from "../global/Header";
import Wrapper from "../global/Wrapper";
import OurStory from "./components/OurStory";
import OurTeam from "./components/OurTeam";
import Trusted from "./components/Trusted";

export default function About() {
  return (
    <Wrapper>
      <Header
        title="About Us"
        description="With we want to optimize the customization process so your team can save
        time when building websites."
      />

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
