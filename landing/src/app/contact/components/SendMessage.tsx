export default function SendMessage() {
  return (
    <div className="w-full mt-20 max-w-[60rem] mx-auto">
      <form>
        <div className="flex sm:flex-row flex-col justify-between items-center gap-8">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="border-b-2 border-neutral-200 py-3 px-2 outline-none focus:border-bright-coal w-full"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="border-b-2 border-neutral-200 py-3 px-2 outline-none focus:border-bright-coal w-full"
          />
        </div>
        <input
          type="text"
          placeholder="Your Subject"
          required
          className="border-b-2 border-neutral-200 py-3 px-2 my-6 outline-none focus:border-bright-coal w-full"
        />
        <textarea
          name="message"
          placeholder="Message"
          id="message"
          rows={5}
          required
          className="border-b-2 resize-none border-neutral-200 py-3 px-2 outline-none focus:border-bright-coal w-full"
        ></textarea>
        <p className="py-4">
          <input type="checkbox" required /> Here will be the google captcha
        </p>
        <button
          type="submit"
          className="bg-blue-700 mt-4 text-white py-3 px-8 rounded-full cursor-pointer hover:bg-blue-900 transition-all duration-300"
        >
          Send Your Message
        </button>
      </form>
    </div>
  );
}
