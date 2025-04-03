import Footer from "../home/Footer";
import Navbar from "../home/Navbar";
import FeatureIcons from "./components/FeaturesIcons";
import Header from "./components/Header";
import OurStory from "./components/OurStory";
import OurTeam from "./components/OurTeam";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="bg-neutral-100 clip-path h-fit rounded-[1.5rem] max-w-[1440px] mx-auto">
        <Header />
      </div>
      <FeatureIcons />
      <OurTeam />
      <OurStory />
      <Footer />
    </div>
  );
}
