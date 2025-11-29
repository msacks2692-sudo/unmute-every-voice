import { User } from "lucide-react";
import { motion } from "framer-motion";

const Founder = () => {
  return <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-12"
          >
            Matthew
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-8"
          >
            <User className="w-12 h-12 text-primary" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 text-muted-foreground leading-relaxed"
          >
            <p>
              Matthew the founder and driving force behind Unmute1. As someone who experienced firsthand the challenges of navigating a digital world not built with accessibility in mind, Matthew understood that true innovation requires inclusive design from the ground up.
            </p>
            <p>
              With a background in AI development and a passion for social impact, Matthew
              recognized that the AI revolution presented both a challenge and an opportunity. The
              challenge: ensuring that cutting-edge technology doesn't leave anyone behind. The
              opportunity: to build systems that work better for everyone by centering the needs
              of those historically excluded.
            </p>
            <p className="text-primary font-semibold text-lg italic pt-4">
              "Technology doesn't truly work until it works for everyone. That's not just our
              mission—it's our measure of success."
            </p>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Founder;