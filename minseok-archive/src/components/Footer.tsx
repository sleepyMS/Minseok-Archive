import { Github, Linkedin, Rss } from "lucide-react"; // Assuming a blog/RSS feed

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/sleepyMS",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/minseok-choi-3214662a1/",
    icon: Linkedin,
  },
  {
    name: "Blog",
    url: "https://me-in-journey.com/",
    icon: Rss,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          {/* Social Media Links */}
          <div className="flex space-x-6 mb-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent-hover transition-colors duration-300"
                aria-label={link.name}
                data-interactive
                data-cursor-text={link.name}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>

          {/* Copyright Notice */}
          <p className="text-secondary text-sm">
            &copy; {currentYear} Minseok Choi. All Rights Reserved.
          </p>
          <p className="text-secondary text-xs mt-1">
            Crafted with passion using React, Three.js, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
