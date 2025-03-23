import About from "./home/About";
import Cta from "./home/Cta";
import Footer from "./home/Footer";
import Header from "./home/Header";
import KeyFeatures from "./home/KeyFeatures";
import Navbar from "./home/Navbar";
import Overview from "./home/Overview";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
      <KeyFeatures />
      <Cta />
      <Overview />
      <Footer />
    </div>
  );
}
