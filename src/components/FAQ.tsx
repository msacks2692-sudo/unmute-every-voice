import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Target, Smartphone, Clock, Users, Lock } from "lucide-react";

const faqs = [
  {
    question: "How accurate is Unmute1's ASL translation?",
    answer: "Our AI-powered translation achieves over 95% accuracy for common ASL signs and phrases. We continuously train our models with input from the Deaf community to improve accuracy for regional signs, colloquialisms, and specialized vocabulary. The system also learns from context to provide more natural translations.",
    icon: Target,
  },
  {
    question: "Is my data private and secure?",
    answer: "Absolutely. All video processing happens locally on your device whenever possible. When cloud processing is needed, data is encrypted end-to-end and never stored permanently. We are HIPAA-compliant for healthcare settings and follow strict data minimization practices. Your conversations are never used for training without explicit consent.",
    icon: Shield,
  },
  {
    question: "What devices are supported?",
    answer: "Unmute1 works on iOS devices (iPhone 12 and newer), Android phones (with Android 10+), tablets, and desktop browsers (Chrome, Firefox, Safari, Edge). We're also developing dedicated apps for healthcare kiosks and accessibility stations in public spaces.",
    icon: Smartphone,
  },
  {
    question: "Does it work in real-time?",
    answer: "Yes! Our technology provides near-instantaneous translation with less than 200ms latency. This enables natural, flowing conversations without awkward pauses. The real-time feedback also helps hearing users learn to adjust their speaking pace for optimal comprehension.",
    icon: Clock,
  },
  {
    question: "Can multiple people use it in a conversation?",
    answer: "Unmute1 supports multi-party conversations with up to 4 participants. The system intelligently identifies and labels each speaker, making group discussions accessible. Perfect for family gatherings, team meetings, or classroom settings.",
    icon: Users,
  },
  {
    question: "How do you handle sensitive conversations?",
    answer: "We have a dedicated healthcare mode that's HIPAA-compliant, with additional privacy safeguards for medical appointments. All sensitive data is encrypted, no recordings are stored, and healthcare providers can integrate Unmute1 with their existing patient privacy protocols.",
    icon: Lock,
  },
];

const FAQ = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
            Questions & Answers
          </span>
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Unmute1's ASL translation technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="hover:no-underline py-5 gap-4">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                      <faq.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <span className="font-semibold text-foreground">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pl-14">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Still have questions? We'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Contact Our Team
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
