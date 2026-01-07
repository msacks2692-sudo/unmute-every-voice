import { Button } from "@/components/ui/button";
import { ArrowRight, Hand, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
            Join the Movement
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Communication designed for
            <br />
            <span className="text-primary">every mind, every voice</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Whether you're Deaf, neurodivergent, or simply communicate differently—Unmute1 bridges 
            the gap with AI-powered ASL translation and adaptive communication tools.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Link to="/mvp">
              <Button variant="hero" size="lg" className="group">
                <Hand className="w-5 h-5" />
                Try ASL Translation
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/features">
              <Button variant="outline" size="lg" className="border-primary/20 hover:border-primary">
                <Brain className="w-5 h-5 mr-2" />
                Explore Accessibility Tools
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Deaf community focused</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Neurodivergent friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Built with the community</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
