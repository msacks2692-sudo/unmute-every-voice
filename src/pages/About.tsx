import { motion } from "framer-motion";
import { Users, Heart, Target, Globe } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AccessibilityButton } from "@/components/AccessibilityButton";

const values = [
  {
    icon: Users,
    title: "Accessibility First",
    description: "Every feature we build starts with accessibility as the foundation, not an afterthought.",
  },
  {
    icon: Heart,
    title: "Empathy-Driven",
    description: "We design with deep understanding of the challenges faced by people with disabilities.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Pushing the boundaries of AI to create tools that truly make a difference.",
  },
  {
    icon: Globe,
    title: "Universal Design",
    description: "Building technology that works for everyone, regardless of ability.",
  },
];

const About = () => {
  return (
    <main id="main-content" className="min-h-screen bg-background">
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
              About <span className="text-primary">Unmute1</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We're on a mission to make AI accessible for everyone — all 8 billion people on the planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Our Story
              </h2>
              <div className="prose prose-lg dark:prose-invert mx-auto">
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Unmute1 was born from a simple observation: as AI transforms our world, 
                  1.3 billion people with disabilities risk being left behind. We believe 
                  this isn't just wrong—it's a massive missed opportunity.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Our founder experienced firsthand how inaccessible technology creates 
                  barriers rather than bridges. This personal journey sparked a vision: 
                  what if AI could be designed from the ground up to empower every voice?
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Today, we're building that vision—one accessible feature at a time. 
                  From AI speech tools to reading aids, every product we create puts 
                  accessibility at its core.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <AccessibilityButton />
    </main>
  );
};

export default About;
