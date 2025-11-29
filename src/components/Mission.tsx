import { Eye, Ear, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Mission = () => {
  const features = [
    {
      icon: Users,
      title: "Universal Design",
      description: "Building AI that works for everyone, from the ground up",
    },
    {
      icon: Eye,
      title: "Vision First",
      description: "Making visual AI accessible to blind and low-vision users",
    },
    {
      icon: Ear,
      title: "Every Voice",
      description: "Audio AI that understands diverse speech patterns and needs",
    },
    {
      icon: Zap,
      title: "Powered by People",
      description: "Co-created with the disability community, not for them",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold"
          >
            We envision a world where accessibility
            <br />
            <span className="text-primary">isn't an afterthought</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            It's the foundation of every technological advancement. Where AI doesn't just serve the
            majority, but empowers every voice.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
              >
                <feature.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
