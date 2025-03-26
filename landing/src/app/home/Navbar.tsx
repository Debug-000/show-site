export default function Navbar() {
  return (
    <div>
      <div className="flex justify-center items-center px-4 py-8 gap-24">
        <div>
          <h1 className="text-3xl font-extrabold text-[#282f3d]">LabraGo</h1>
        </div>
        <div>
          <ul className="flex justify-center items-center gap-2 font-normal tracking-wider">
            <a
              href="#"
              className="border-b-[2px] border-transparent hover:border-[#000] py-2 px-2 hover:text-[#000]"
            >
              Home
            </a>
            <a
              href="docs"
              className="border-b-[2px] border-transparent hover:border-[#000] py-2 px-2 hover:text-[#000]"
            >
              Docs
            </a>
            <a
              href="features"
              className="border-b-[2px] border-transparent hover:border-[#000] py-2 px-2 hover:text-[#000]"
            >
              Features
            </a>
            <a
              href="community"
              className="border-b-[2px] border-transparent hover:border-[#000] py-2 px-2 hover:text-[#000]"
            >
              Community
            </a>
            <a
              href="blog"
              className="border-b-[2px] border-transparent hover:border-[#000] py-2 px-2 hover:text-[#000]"
            >
              Blog
            </a>
            <a
              href="about"
              className="border-b-[2px] border-transparent hover:border-[#000] py-2 px-2 hover:text-[#000]"
            >
              About
            </a>
            <a
              href="showcase"
              className="border-b-[2px] border-transparent hover:border-[#000] py-2 px-2 hover:text-[#000]"
            >
              Showcase
            </a>
            <a
              href="contact"
              className="border-b-[2px] border-transparent hover:border-[#000] py-2 px-2 hover:text-[#000]"
            >
              Contact
            </a>
          </ul>
        </div>
        <div>
          <a
            href="docs"
            className="bg-[#282f3d] text-white px-8 py-4 rounded-3xl"
          >
            {" "}
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
