import { Button } from "@/components/ui/button";
import { ArrowRight, Mic } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import DustParticles from "./DustParticles";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="AI technology merging with accessibility symbols"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Dust Particles Animation */}
      <DustParticles />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-up">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
              UNMUTE
              <span className="text-primary inline-flex items-baseline">
                1
                <Mic className="w-8 h-8 md:w-12 md:h-12 ml-1 animate-pulse-glow" />
              </span>
            </h1>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            Flipping the Script on AI,
            <br />
            <span className="text-primary">everyone has a voice</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Accessibility as foundation, not afterthought. AI that empowers every voice, not just
            the majority.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button variant="hero" size="lg" className="group">
              Join the Movement
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="pt-12 text-center">
            <p className="text-5xl md:text-7xl font-black text-primary mb-2 animate-fade-in">
              1.3B
            </p>
            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              people leading the charge
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
