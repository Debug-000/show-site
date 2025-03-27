import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-8 mt-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-[2rem] font-semibold mb-4">LabraGo</h3>
            <p className="text-sm">
              LabraGo is the leading open-source Headless CMS. LabraGo gives
              developers the freedom to use their favorite tools and frameworks
              while allowing editors to easily manage their content and
              distribute it anywhere.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul>
              <li>
                <Link href="/" className="hover:text-blue-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul>
              <li>
                <Link href="/docs" className="hover:text-blue-300">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-300">
                  Frameworks
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-300">
                  LabraGo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Integrations</h3>
            <ul>
              <li>
                <Link href="/" className="hover:text-blue-300">
                  Next.js CMS
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-300">
                  React.js CMS
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-300">
                  Flutter CMS
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-300">
                  React Native CMS
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-300">
                  Svelte CMS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">1234 Main St, Some City, Some Country</p>
            <p className="text-sm mt-2">
              Email:{" "}
              <a href="mailto:info@example.com" className="hover:text-blue-300">
                info@example.com
              </a>
            </p>
            <div className="flex justify-start mt-8 space-x-4">
              <Link href="https://facebook.com" className="hover:text-blue-300">
                <FaFacebook size={24} />
              </Link>
              <Link href="https://twitter.com" className="hover:text-blue-300">
                <FaTwitter size={24} />
              </Link>
              <Link
                href="https://instagram.com"
                className="hover:text-blue-300"
              >
                <FaInstagram size={24} />
              </Link>
              <Link href="https://linkedin.com" className="hover:text-blue-300">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-500 mt-8 pt-4 text-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} LabraGo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
