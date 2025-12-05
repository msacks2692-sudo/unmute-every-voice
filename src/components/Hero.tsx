import { Button } from "@/components/ui/button";
import { ArrowRight, Mic } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import DustParticles from "./DustParticles";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay - Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 opacity-90 shadow-glow rounded-lg"
      >
        <img src={heroImage} alt="AI technology merging with accessibility symbols" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </motion.div>

      {/* Dust Particles Animation */}
      <DustParticles />

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          {/* Logo/Brand */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
              UNMUTE
              <span className="text-primary inline-flex items-baseline">
                1
                <Mic className="w-8 h-8 md:w-12 md:h-12 ml-1 animate-pulse-glow" />
              </span>
            </h1>
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground"
          >
            Flipping the Script on AI,
            <br />
            <span className="text-primary">everyone has a voice</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Accessibility as foundation, not afterthought. AI that empowers every voice, not just
            the majority.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button variant="hero" size="lg" className="group">
              Join the Movement
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-12 text-center shadow-glow opacity-100 rounded-md"
          >
            <p className="text-5xl md:text-7xl font-black text-primary mb-2 animate-fade-in">
              1.3B
            </p>
            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              people leading the charge
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>;
};
export default Hero;