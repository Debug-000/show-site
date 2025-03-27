export default function Navbar() {
  return (
    <div>
      <div className="flex justify-center items-center px-4 py-8 gap-24">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700">LabraGo</h1>
        </div>
        <div>
          <ul className="flex justify-center items-center gap-2 font-normal tracking-wider">
            <a
              href="#"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Home
            </a>
            <a
              href="docs"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Docs
            </a>
            <a
              href="features"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Features
            </a>
            <a
              href="community"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Community
            </a>
            <a
              href="blog"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Blog
            </a>
            <a
              href="about"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              About
            </a>
            <a
              href="showcase"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Showcase
            </a>
            <a
              href="contact"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Contact
            </a>
          </ul>
        </div>
        <div className="scaled">
          <a
            href="docs"
            className="bg-blue-700 text-white px-8 py-4 rounded-3xl scaled"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
