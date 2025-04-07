import { BsLightning, BsRobot } from "react-icons/bs";
import { IoIosColorPalette } from "react-icons/io";

const Features = [
  {
    icon: BsLightning,
    title: "Lightning-Fast Performance",
    description:
      "Say goodbye to lag and slow load times. Our system is optimized for speed, ensuring smooth and responsive interactions, even when handling complex tasks. Whether you&apos;re multitasking or working on large projects, everything runs seamlessly without delays.",
  },
  {
    icon: BsRobot,
    title: "AI-Powered Automation",
    description:
      "Work smarter, not harder. Our intelligent automation tools handle repetitive tasks for you, learning from your patterns and adapting to your workflow. From auto-suggestions to smart scheduling, it saves you time and effort, so you can focus on what truly matters.",
  },
  {
    icon: IoIosColorPalette,
    title: "Minimalist & Intuitive UI",
    description:
      "No clutter, no confusion—just a clean, thoughtfully designed interface that makes navigation effortless. With a user-friendly layout and intuitive controls, you can accomplish tasks quickly and efficiently without unnecessary complexity.",
  },
];

export default Features;

// Note: Ensure that wherever you render the `icon`, you use it as a React component, e.g., <Feature.icon size={32} />.
