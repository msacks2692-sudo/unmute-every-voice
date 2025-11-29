import { Accessibility, Brain, Globe } from "lucide-react";
import { motion } from "framer-motion";

const Impact = () => {
  const stats = [
    {
      icon: Globe,
      value: "1.3B",
      label: "People with disabilities worldwide",
      color: "text-primary",
    },
    {
      icon: Brain,
      value: "15%",
      label: "Of global population often excluded from AI",
      color: "text-accent",
    },
    {
      icon: Accessibility,
      value: "100%",
      label: "Our commitment to inclusive technology",
      color: "text-primary",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The numbers tell a story of
            <br />
            <span className="text-primary">untapped potential</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            When we design for accessibility, we innovate for everyone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.08, y: -10 }}
              className="text-center p-8 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl group"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6"
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3, type: "spring" }}
                className={`text-5xl md:text-6xl font-black mb-3 ${stat.color}`}
              >
                {stat.value}
              </motion.div>
              <p className="text-muted-foreground leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto mt-16 p-8 bg-primary/5 rounded-xl border border-primary/20 text-center"
        >
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            "When we center the margins, we improve the experience for everyone.
            <br />
            <span className="text-primary font-semibold">That's the Unmute1 promise.</span>"
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
