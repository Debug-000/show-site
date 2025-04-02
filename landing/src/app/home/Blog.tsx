import Image from "next/image";
import Link from "next/link";
import FrameBanner from "../../../public/JavascriptFrameworks.png";
import FutureBanner from "../../../public/Future.jpg";
import TailwindBanner from "../../../public/Tailwind-Banner.jpg";

const blogPosts = [
  {
    title: "The Future of Web Development",
    description:
      "Web development is always evolving. Let’s take a look at what’s next.",
    image: FutureBanner,
    slug: "future-of-web-development",
  },
  {
    title: "Understanding JavaScript Frameworks",
    description:
      "Which JavaScript framework should you choose for your next project?",
    image: FrameBanner,
    slug: "understanding-js-frameworks",
  },
  {
    title: "Tailwind CSS: A Game Changer",
    description:
      "Tailwind CSS makes styling easier and faster. Learn how it’s transforming web design.",
    image: TailwindBanner,
    slug: "tailwind-css-game-changer",
  },
];

export default function Blog() {
  return (
    <div className="flex flex-col items-center mt-[-10rem]">
      <h5 className="bg-neutral-100 w-fit px-4 py-2 rounded-4xl tracking-wider font-black text-blue-700">
        Our Blog
      </h5>
      <h1 className="font-black text-[2rem] mt-4 capitalize text-center max-w-[40rem]">
        Read our latest articles on web development, design, and more.
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-[10rem]">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transform hover:scale-105 transition duration-300"
          >
            <div className="relative w-full h-48">
              <Image
                src={post.image}
                alt={post.title}
                width={500}
                height={500}
                className="rounded-t-lg object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {post.title}
              </h2>
              <p className="text-gray-600 mt-2">{post.description}</p>
              <Link href={`/blog/${post.slug}`}>
                <span className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
                  Read More
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
