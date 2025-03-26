import About from "./home/About";
import Companies from "./home/Companies";
import Cta from "./home/Cta";
import Footer from "./home/Footer";
import Header from "./home/Header";
import KeyFeatures from "./home/KeyFeatures";
import Navbar from "./home/Navbar";
import Overview from "./home/Overview";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center px-[10rem] w-full fixed top-0 z-[-1]">
        <div className="w-[2px] bg-[#f5f5f5] h-screen"></div>
        <div className="w-[2px] bg-[#f5f5f5] h-screen"></div>
        <div className="w-[2px] bg-[#f5f5f5] h-screen"></div>
        <div className="w-[2px] bg-[#f5f5f5] h-screen"></div>
      </div>
      <Navbar />
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-[#f3f3f3] clip-path h-fit rounded-[1.5rem]">
          <Header />
        </div>
        <Companies />
        <KeyFeatures />
        <About />
        <Cta />
        <Overview />
        <Footer />
      </div>
    </div>
  );
}
