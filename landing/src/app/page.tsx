import Companies from "./home/Companies";
import FAQ from "./home/FAQ";
import Footer from "./home/Footer";
import Header from "./home/Header";
import KeyFeatures from "./home/KeyFeatures";
import Navbar from "./home/Navbar";
import Showing from "./home/Showing";
import Testimonials from "./home/Testimonials";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center px-[10rem] w-full fixed top-0 z-[-1]">
        <div className="w-[2px] bg-neutral-100 h-screen"></div>
        <div className="w-[2px] bg-neutral-100 h-screen"></div>
        <div className="w-[2px] bg-neutral-100 h-screen"></div>
        <div className="w-[2px] bg-neutral-100 h-screen"></div>
      </div>
      <Navbar />
      <div className="max-w-[1440px] mx-auto">
        <div className="bg-neutral-100 clip-path h-fit rounded-[1.5rem]">
          <Header />
        </div>
        <Companies />
        <KeyFeatures />
        <Showing />
        <FAQ />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
