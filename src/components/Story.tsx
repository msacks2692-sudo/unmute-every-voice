import { motion } from "framer-motion";

const Story = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            Where It All Started
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-muted-foreground leading-relaxed"
          >
            <p>
              In 2023, a vision took shape: to revolutionize how AI serves humanity by placing
              accessibility at its core. We recognized that while AI technology was advancing
              rapidly, it often left behind those who needed it most—people with disabilities.
            </p>
            <p>
              The turning point came when we realized that designing for accessibility doesn't
              just help one community—it elevates the entire user experience. Features built for
              those with visual impairments improve navigation for everyone. Voice interfaces
              designed for motor disabilities become tools of convenience for all.
            </p>
            <p>
              We assembled a team not just of engineers and designers, but advocates and
              individuals from the disability community itself. Because we understood a
              fundamental truth: you can't build for a community without building with them.
            </p>
            <p className="text-foreground font-semibold text-lg pt-4">
              This isn't just about making AI accessible. It's about making AI that's better for
              everyone because it was built for everyone.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Story;
