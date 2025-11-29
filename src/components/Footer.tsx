import { Mic, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight">
              UNMUTE
              <span className="text-primary inline-flex items-baseline">
                1
                <Mic className="w-4 h-4 ml-1" />
              </span>
            </span>
          </div>

          <p className="text-sm text-secondary-foreground/70">
            © {currentYear} Unmute1. Empowering every voice through accessible AI.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/unmute1ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors group"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Follow @unmute1ai</span>
            </a>
            <a
              href="#"
              className="text-sm hover:text-primary transition-colors"
              aria-label="Privacy Policy"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm hover:text-primary transition-colors"
              aria-label="Terms of Service"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm hover:text-primary transition-colors"
              aria-label="Contact Us"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
