import { motion } from "framer-motion";
import { Check, Sparkles, Building2, Hospital, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AccessibilityButton } from "@/components/AccessibilityButton";

const tiers = [
  {
    name: "Individual",
    icon: User,
    price: "$9",
    period: "/month",
    description: "Perfect for personal use and everyday conversations",
    features: [
      "Real-time ASL to text translation",
      "Text to ASL avatar responses",
      "5 hours of translation per month",
      "Basic conversation history",
      "Mobile & desktop access",
      "Community support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Healthcare",
    icon: Hospital,
    price: "$49",
    period: "/month",
    description: "Built for clinics, hospitals, and healthcare providers",
    features: [
      "Everything in Individual",
      "Unlimited translation hours",
      "HIPAA-compliant infrastructure",
      "Medical terminology optimization",
      "Multi-provider access (up to 10)",
      "Priority support & onboarding",
      "Patient session summaries",
      "EHR integration ready",
    ],
    cta: "Contact Sales",
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    price: "Custom",
    period: "",
    description: "Tailored solutions for large organizations and institutions",
    features: [
      "Everything in Healthcare",
      "Unlimited users & providers",
      "Custom AI model fine-tuning",
      "Dedicated account manager",
      "SLA guarantee (99.9% uptime)",
      "On-premise deployment option",
      "Advanced analytics dashboard",
      "Custom API integrations",
      "White-label options",
    ],
    cta: "Get a Quote",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <main id="main-content" className="min-h-screen relative">
      <Navbar />

      <section className="pt-32 pb-24 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Simple, transparent pricing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Plans for <span className="text-primary">Every Need</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're an individual, healthcare provider, or enterprise — we have a plan that fits your communication needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex"
                >
                  <Card
                    className={`p-8 flex flex-col w-full relative ${
                      tier.popular
                        ? "border-primary shadow-elevated ring-2 ring-primary/20"
                        : ""
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-5 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">{tier.name}</h2>
                    </div>

                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">{tier.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-8">
                      {tier.description}
                    </p>

                    <ul className="space-y-3 mb-8 flex-grow">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={tier.popular ? "default" : "outline"}
                      className="w-full"
                      asChild
                    >
                      <Link
                        to={
                          tier.name === "Individual"
                            ? "/mvp"
                            : "/contact"
                        }
                      >
                        {tier.cta}
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-muted-foreground mt-12"
          >
            All plans include a 14-day free trial. No credit card required.
          </motion.p>
        </div>
      </section>

      <Footer />
      <AccessibilityButton />
    </main>
  );
};

export default Pricing;
