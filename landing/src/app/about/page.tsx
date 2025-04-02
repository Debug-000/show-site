import Footer from "../home/Footer";
import Navbar from "../home/Navbar";
import OurStory from "./components/OurStory";
import OurTeam from "./components/OurTeam";

export default function About() {
  return (
    <div>
      <Navbar />
      <OurTeam />
      <OurStory />
      <Footer />
    </div>
  );
}
