"use client";
import { useState, useEffect, useCallback } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollTop = useCallback(() => {
    if (!isVisible && window.pageYOffset > 100) {
      setIsVisible(true);
    } else if (isVisible && window.pageYOffset <= 100) {
      setIsVisible(false);
    }
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [checkScrollTop]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed z-50 bottom-8 right-8 bg-blue-700 text-white-1 p-4 cursor-pointer rounded-full shadow-lg transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <FaArrowUpLong size={22} />
    </button>
  );
};

export default BackToTopButton;
