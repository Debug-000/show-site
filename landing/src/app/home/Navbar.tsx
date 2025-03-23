export default function Navbar() {
  return (
    <div>
      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="w-[50%] text-4xl font-extrabold">Logo</h1>
        <ul className="flex justify-between items-center w-[50%]">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="docs">Docs</a>
          </li>
          <li>
            <a href="features">Features</a>
          </li>
          <li>
            <a href="community">Community</a>
          </li>
          <li>
            <a href="blog">Blog</a>
          </li>
          <li>
            <a href="about">About</a>
          </li>
          <li>
            <a href="showcase">Showcase</a>
          </li>
          <li>
            <a href="contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
