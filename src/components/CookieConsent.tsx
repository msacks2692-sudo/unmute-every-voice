import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

// Export function to allow reopening the banner
export const reopenCookieConsent = () => {
  localStorage.removeItem("cookie-consent");
  window.dispatchEvent(new Event("reopen-cookie-consent"));
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for reopen event
  useEffect(() => {
    const handleReopen = () => setShowBanner(true);
    window.addEventListener("reopen-cookie-consent", handleReopen);
    return () => window.removeEventListener("reopen-cookie-consent", handleReopen);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card/95 backdrop-blur-lg p-4 md:p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-3 text-primary">
                <Cookie className="h-6 w-6 shrink-0" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your experience and analyze site traffic. 
                  By clicking "Accept", you consent to our use of cookies. 
                  Read our{" "}
                  <a href="/privacy" className="text-primary underline hover:no-underline">
                    Privacy Policy
                  </a>{" "}
                  for more information.
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecline}
                  className="flex-1 md:flex-none"
                >
                  Decline
                </Button>
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="flex-1 md:flex-none"
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
