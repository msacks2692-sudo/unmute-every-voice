import { motion } from "framer-motion";
import { Quote, Hand, Brain, Ear, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "For the first time, I can have a real-time conversation with my hearing coworkers without an interpreter. This technology is life-changing.",
      name: "Marcus T.",
      role: "Software Developer",
      community: "Deaf",
      icon: Hand,
    },
    {
      quote: "The sensory-friendly mode helps me focus during video calls. No more overwhelming visual clutter—just clear communication.",
      name: "Jamie L.",
      role: "Graphic Designer",
      community: "Neurodivergent",
      icon: Brain,
    },
    {
      quote: "As someone with progressive hearing loss, the visual sound alerts mean I never miss when someone's calling my name or the doorbell rings.",
      name: "Patricia W.",
      role: "Teacher",
      community: "Hard of Hearing",
      icon: Ear,
    },
    {
      quote: "My Deaf parents can finally video chat with my hearing kids without me interpreting. Watching them connect directly brought tears to my eyes.",
      name: "David K.",
      role: "CODA (Child of Deaf Adults)",
      community: "Deaf Family",
      icon: Hand,
    },
    {
      quote: "The reading assistance and customizable interface make digital communication so much less exhausting. It's built for how my brain actually works.",
      name: "Alex R.",
      role: "Content Writer",
      community: "ADHD & Dyslexic",
      icon: Brain,
    },
    {
      quote: "Real-time captions with speaker identification help me follow group conversations. I'm finally part of the discussion, not just observing it.",
      name: "Sarah M.",
      role: "Marketing Manager",
      community: "Hard of Hearing",
      icon: Ear,
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Community Voices
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real Stories, <span className="text-primary">Real Impact</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from the Deaf, hard of hearing, and neurodivergent community members who are shaping Unmute1.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg relative">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                
                {/* Quote Text */}
                <p className="text-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <testimonial.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                {/* Community Badge */}
                <span className="absolute top-6 right-6 px-3 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full">
                  {testimonial.community}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Test */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 rounded-2xl p-8 md:p-10 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Hand className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Help Us Build Better
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
              We're looking for Deaf, hard of hearing, and neurodivergent users to test new features 
              and share feedback. Your voice shapes our technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mvp">
                <Button variant="hero" size="lg" className="group">
                  Become a Tester
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-primary/20 hover:border-primary">
                  Share Your Story
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Early testers get free premium access and a direct line to our development team.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
