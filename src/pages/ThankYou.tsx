import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Mail } from "lucide-react";
import { motion } from "framer-motion";

const ThankYou = () => {
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
        
        <p className="text-muted-foreground mb-8">
          Thank you for signing up for early access to Unmute1. We'll be in touch soon with updates and your exclusive invitation.
        </p>

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
