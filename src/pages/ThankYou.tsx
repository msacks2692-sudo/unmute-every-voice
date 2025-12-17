import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Mail, Twitter, Linkedin, Facebook } from "lucide-react";
import { motion } from "framer-motion";

const ThankYou = () => {
  const shareText = "I just signed up for early access to Unmute1 - AI-powered accessibility tools that empower every voice! 🎤✨";
  const shareUrl = "https://unmute1.com/mvp";

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-primary" />
        </motion.div>

        <h1 className="text-3xl font-bold text-foreground mb-4">
          You're on the list!
        </h1>
        
        <p className="text-muted-foreground mb-6">
          Thank you for signing up for early access to Unmute1. We'll be in touch soon with updates and your exclusive invitation.
        </p>

        {/* Social sharing */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-3">Spread the word</p>
          <div className="flex items-center justify-center gap-3">
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30">
                <Twitter className="w-4 h-4" />
              </Button>
            </a>
            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30">
                <Linkedin className="w-4 h-4" />
              </Button>
            </a>
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/30">
                <Facebook className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 mb-8 flex items-center gap-3">
          <Mail className="w-5 h-5 text-primary flex-shrink-0" />
          <p className="text-sm text-muted-foreground text-left">
            Check your inbox for a confirmation email. Don't forget to check your spam folder!
          </p>
        </div>

        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ThankYou;
