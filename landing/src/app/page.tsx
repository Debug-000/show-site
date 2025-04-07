import Companies from "./global/Companies";
import FAQ from "./home/FAQ";
import Header from "./home/Header";
import KeyFeatures from "./home/KeyFeatures";
import Showing from "./home/Showing";
import Testimonials from "./home/Testimonials";
import Blog from "./home/Blog";
import FloatingBubbles from "./global/FloatingBubble";
import Wrapper from "./global/Wrapper";

export default function Home() {
  return (
    <Wrapper>
      <div className="bg-neutral-100 clip-path h-fit rounded-[1.5rem] max-w-[1440px] mx-auto">
        <Header />
      </div>
      <Companies />
      <KeyFeatures />
      <div className="bg-coal-1">
        <Showing />
      </div>
      <FAQ />
      <div className="relative bg-blue-700 overflow-hidden">
        <FloatingBubbles />
        <div className="relative z-10">
          <Testimonials />
        </div>
      </div>
      <Blog />
    </Wrapper>
  );
}
