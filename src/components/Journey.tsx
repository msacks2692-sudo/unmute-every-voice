import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Journey = () => {
  const milestones = [
    {
      title: "The First Spark",
      description:
        "Recognizing the gap in accessible AI technology and assembling a team committed to change.",
    },
    {
      title: "Community Co-Creation",
      description:
        "Partnering with disability advocates and users to understand real needs, not assumed ones.",
    },
    {
      title: "Prototyping for Inclusivity",
      description:
        "Building early versions with accessibility features as core functionality, not add-ons.",
    },
    {
      title: "Testing in the Real World",
      description:
        "Extensive user testing with diverse communities to refine and improve every interaction.",
    },
    {
      title: "The Unmute1 Launch",
      description:
        "Introducing AI tools that empower all 8 billion voices on this planet, starting with those most often unheard.",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Our Journey
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-6 group"
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 0.4 }}
                  className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                </motion.div>
                {index < milestones.length - 1 && (
                  <div className="w-px h-full bg-border mt-4" />
                )}
              </div>
              <div className="pb-12">
                <h3 className="text-xl font-semibold mb-2 text-primary">{milestone.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
