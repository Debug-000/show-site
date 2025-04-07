import { ReactNode } from "react";
import BackLines from "./BackLines";
import BackToTopButton from "./BackToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="max-w-screen overflow-x-hidden">
      <BackLines />
      <Navbar />
      {children}
      <Footer />
      <BackToTopButton />
    </div>
  );
}
