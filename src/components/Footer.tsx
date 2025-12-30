import { Mic, Twitter, Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { reopenCookieConsent } from "./CookieConsent";

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

          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-end">
            <Link
              to="/mvp"
              className="text-sm hover:text-primary transition-colors font-medium"
              aria-label="Get Early Access"
            >
              Early Access
            </Link>
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
            <button
              onClick={reopenCookieConsent}
              className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
              aria-label="Manage Cookies"
            >
              <Cookie className="w-3 h-3" />
              Manage Cookies
            </button>
            <Link
              to="/privacy"
              className="text-sm hover:text-primary transition-colors"
              aria-label="Privacy Policy"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-sm hover:text-primary transition-colors"
              aria-label="Terms of Service"
            >
              Terms
            </Link>
            <Link
              to="/contact"
              className="text-sm hover:text-primary transition-colors"
              aria-label="Contact Us"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
