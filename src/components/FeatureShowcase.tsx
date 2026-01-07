import { motion } from "framer-motion";
import { Hand, Mic, ArrowLeftRight } from "lucide-react";

const FeatureShowcase = () => {
  const features = [
    {
      icon: Hand,
      title: "Real-Time ASL Translation",
      description: "AI-powered recognition translates American Sign Language into text and speech instantly, enabling seamless conversations.",
      highlight: "< 100ms latency",
    },
    {
      icon: Mic,
      title: "Speech-to-Text & Sign",
      description: "Convert spoken words to text and visual sign representations, making verbal communication accessible to the Deaf community.",
      highlight: "99% accuracy",
    },
    {
      icon: ArrowLeftRight,
      title: "Two-Way Communication",
      description: "Bridge the gap between Deaf and hearing individuals with bidirectional translation that works in real-time.",
      highlight: "Seamless flow",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Core Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Communication Without <span className="text-primary">Barriers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform makes every conversation accessible, no matter how you communicate.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                {/* Icon container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <feature.icon className="w-8 h-8 text-primary" />
                </motion.div>

                {/* Highlight badge */}
                <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-semibold rounded-full mb-4">
                  {feature.highlight}
                </span>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Powered by cutting-edge AI trained on diverse signing styles and accents
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
