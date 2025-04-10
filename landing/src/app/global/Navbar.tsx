import Link from "next/link";
import NavLinks from "../data/NavLinks";

export default function Navbar() {
  return (
    <div>
      <div className="flex justify-center items-center px-4 py-8 mb-8 gap-24">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-700">LabraGo</h1>
        </div>
        <div>
          <ul className="flex justify-center items-center gap-2 font-normal tracking-wider">
            {NavLinks.map((nav, index) => (
              <Link
                key={index}
                href={nav.link}
                className="border-b-[2px] border-transparent text-coal-1 hover:border-blue-700 py-2 px-2 hover:text-blue-700"
              >
                {nav.name}
              </Link>
            ))}
          </ul>
        </div>
        <div className="scaled">
          <Link
            href="/docs/get-started"
            className="bg-blue-700 text-white px-8 py-4 rounded-3xl scaled"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
