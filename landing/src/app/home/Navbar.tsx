import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <div className="flex justify-center items-center px-4 py-8 gap-24">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700">LabraGo</h1>
        </div>
        <div>
          <ul className="flex justify-center items-center gap-2 font-normal tracking-wider">
            <Link
              href="/"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Home
            </Link>
            <Link
              href="docs"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Docs
            </Link>
            <Link
              href="features"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Features
            </Link>
            <Link
              href="community"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Community
            </Link>
            <Link
              href="blog"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Blog
            </Link>
            <Link
              href="about"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              About
            </Link>
            <Link
              href="showcase"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Showcase
            </Link>
            <Link
              href="contact"
              className="border-b-[2px] border-transparent hover:border-blue-700 py-2 px-2 hover:text-blue-700"
            >
              Contact
            </Link>
          </ul>
        </div>
        <div className="scaled">
          <Link
            href="docs"
            className="bg-blue-700 text-white px-8 py-4 rounded-3xl scaled"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
