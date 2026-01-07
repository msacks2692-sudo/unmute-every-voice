import { motion } from "framer-motion";
import { 
  Hand, 
  Ear, 
  Brain, 
  Eye, 
  Volume2, 
  MessageSquare, 
  Sparkles,
  Zap,
  Settings,
  Users,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AccessibilityButton } from "@/components/AccessibilityButton";

const Accessibility = () => {
  const deafTools = [
    {
      icon: Hand,
      title: "Real-Time ASL Translation",
      description: "AI-powered recognition translates American Sign Language into text and speech instantly. Our model is trained on diverse signing styles for maximum accuracy.",
      features: ["< 100ms latency", "Works offline", "Multiple dialects supported"],
    },
    {
      icon: MessageSquare,
      title: "Speech-to-Text Captions",
      description: "Live captions for any conversation, meeting, or media. Accurate transcription that keeps up with natural speech patterns.",
      features: ["99% accuracy", "Speaker identification", "Punctuation included"],
    },
    {
      icon: Volume2,
      title: "Text-to-Speech Output",
      description: "Convert your typed messages or sign language into natural-sounding speech, enabling seamless communication with hearing individuals.",
      features: ["Natural voices", "Adjustable speed", "Multiple languages"],
    },
  ];

  const hardOfHearingTools = [
    {
      icon: Ear,
      title: "Hearing Enhancement",
      description: "Amplify and clarify audio in real-time. Filter background noise and enhance speech frequencies for clearer listening.",
      features: ["Noise cancellation", "Speech enhancement", "Custom profiles"],
    },
    {
      icon: Sparkles,
      title: "Visual Sound Alerts",
      description: "Never miss important sounds. Get visual or haptic notifications for doorbells, alarms, your name being called, and more.",
      features: ["Customizable alerts", "Pattern recognition", "Smart notifications"],
    },
    {
      icon: Zap,
      title: "Loop System Integration",
      description: "Seamlessly connect with hearing loops and T-coil compatible devices in public spaces for enhanced audio delivery.",
      features: ["Auto-detection", "Signal optimization", "Venue mapping"],
    },
  ];

  const neurodivergentTools = [
    {
      icon: Brain,
      title: "Sensory-Friendly Mode",
      description: "Reduce visual and auditory stimulation with calming color schemes, reduced animations, and distraction-free interfaces.",
      features: ["Low-stimulation themes", "Motion reduction", "Focus mode"],
    },
    {
      icon: Eye,
      title: "Reading Assistance",
      description: "Dyslexia-friendly fonts, adjustable spacing, reading rulers, and text-to-speech to make reading comfortable for everyone.",
      features: ["OpenDyslexic font", "Line highlighting", "Bionic reading"],
    },
    {
      icon: Settings,
      title: "Customizable Experience",
      description: "Every mind works differently. Personalize colors, fonts, layouts, and interactions to match your unique needs.",
      features: ["Saved profiles", "Quick toggles", "Per-app settings"],
    },
  ];

  const ToolSection = ({ 
    title, 
    description, 
    tools, 
    gradient 
  }: { 
    title: string; 
    description: string; 
    tools: typeof deafTools; 
    gradient: string;
  }) => (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl">{description}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <div className={`h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg`}>
              <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center mb-5`}>
                <tool.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{tool.description}</p>
              
              <ul className="space-y-2">
                {tool.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Accessibility First
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tools Built for
              <br />
              <span className="text-primary">How You Communicate</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you're Deaf, hard of hearing, or neurodivergent, our AI-powered tools 
              adapt to your needs—not the other way around.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/mvp">
                <Button variant="hero" size="lg" className="group">
                  <Hand className="w-5 h-5" />
                  Try the Demo
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Share Your Needs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Sections */}
      <section className="container mx-auto px-4">
        <ToolSection
          title="For Deaf Users"
          description="Full communication access through AI-powered sign language translation and real-time captioning."
          tools={deafTools}
          gradient="bg-gradient-to-br from-primary to-primary/70"
        />

        <div className="border-t border-border" />

        <ToolSection
          title="For Hard of Hearing Users"
          description="Enhanced audio, visual alerts, and assistive technology integration for clearer communication."
          tools={hardOfHearingTools}
          gradient="bg-gradient-to-br from-accent to-accent/70"
        />

        <div className="border-t border-border" />

        <ToolSection
          title="For Neurodivergent Users"
          description="Sensory-friendly interfaces and customizable experiences designed for diverse cognitive needs."
          tools={neurodivergentTools}
          gradient="bg-gradient-to-br from-secondary to-secondary/70"
        />
      </section>

      {/* Commitment Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Accessibility Commitment
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We don't build for accessibility—we build with accessibility at the core. 
              Every feature is co-designed with Deaf, hard of hearing, and neurodivergent 
              community members to ensure our tools genuinely serve your needs.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">WCAG 2.1 AA Compliant</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-muted-foreground">Community Advisors</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <p className="text-muted-foreground">Accessible Support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <AccessibilityButton />
    </main>
  );
};

export default Accessibility;
