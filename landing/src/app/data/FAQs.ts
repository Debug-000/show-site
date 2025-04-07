const FAQs = [
  {
    question: "What is LabraGo?",
    answer:
      "LabraGo is an open-source, Go based, Headless CMS that saves developers a lot of development time while giving them the freedom to use their favorite tools and frameworks. LabraGo also enables content editors to streamline content delivery (text, images, video, etc) across any devices.",
  },
  {
    question: "What is a Headless CMS?",
    answer:
      "A headless CMS is a back-end only content management system (CMS) built from the ground up as a content repository that makes content accessible via an API for display on any device. Headless CMS are also particularly suitable for websites designed using the Jamstack model where JavaScript, APIs, and Markup work together to make web development easier and user experiences better.",
  },
  {
    question: "What is an API?",
    answer:
      "API is the acronym for Application Programming Interface, which is a software intermediary that allows two applications to talk to each other. In case you want to connect a React application with LabraGo, we say that React is the client and LabraGo the system. Indeed, React will communicate to LabraGo, by making HTTP requests. LabraGo will then give a response back to your client. If your LabraGo application contains restaurants and you want to list them in your React application, all you need to do is to make an HTTP request to LabraGo which will take care to give you a response containing your restaurants. The API Endpoints documentation will give you all the keys in hand to interact with your LabraGo API.",
  },
  {
    question: "How do I deploy LabraGo?",
    answer:
      "LabraGo is self-hosted. It's up to you to decide where to deploy and host your LabraGo project. We have a list of deployment guides for Amazon AWS, Microsoft Azure, DigitalOcean, Google App Engine and Heroku. You can also use our 1-click deploy buttons and Docker installation. If you have any questions, feel free to ask us on our Discord server.",
  },
];

export default FAQs;
