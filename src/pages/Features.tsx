import { motion } from "framer-motion";
import { MessageSquare, Image, FileText, Mic, Eye, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AccessibilityButton } from "@/components/AccessibilityButton";

const features = [
  {
    icon: MessageSquare,
    title: "AI Chat Assistant",
    description: "Fully accessible chat interface with screen reader support, keyboard navigation, and customizable text sizes.",
    highlight: "100% Screen Reader Compatible",
  },
  {
    icon: Image,
    title: "Image Description",
    description: "AI-powered image descriptions that help visually impaired users understand visual content in detail.",
    highlight: "Detailed Alt-Text Generation",
  },
  {
    icon: FileText,
    title: "Text Summarization",
    description: "Simplify complex documents into digestible summaries, perfect for users with cognitive disabilities.",
    highlight: "Adjustable Reading Levels",
  },
  {
    icon: Mic,
    title: "Speech Tools",
    description: "Customizable voice profiles with adjustable pitch, speed, and volume for personalized listening experiences.",
    highlight: "Multiple Voice Options",
  },
  {
    icon: Eye,
    title: "Reading Aids",
    description: "Dyslexia-friendly fonts, reading rulers, and high contrast modes to make text more accessible.",
    highlight: "OpenDyslexic Font Support",
  },
  {
    icon: Brain,
    title: "Smart Agents",
    description: "AI agents designed with accessibility-first principles, providing assistance that adapts to your needs.",
    highlight: "Personalized Assistance",
  },
];

const Features = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Powerful <span className="text-primary">Features</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Every feature is designed with accessibility at its core, ensuring everyone can benefit from AI technology.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/mvp">Try the Demo</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {feature.highlight}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Experience Accessible AI?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Try our demo and see how AI can be designed for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/mvp">Try Demo Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <AccessibilityButton />
    </main>
  );
};

export default Features;
