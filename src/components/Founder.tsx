import { User } from "lucide-react";
const Founder = () => {
  return <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 animate-fade-up">Matthew</h2>
          
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-8 animate-scale-in">
            <User className="w-12 h-12 text-primary" />
          </div>

          <div className="space-y-6 text-muted-foreground leading-relaxed animate-fade-up">
            <p>
              Matthew the founder and driving force behind Unmute1. As someone who experienced firsthand the challenges of navigating a digital world not built with accessibility in mind, Matthew understood that true innovation requires inclusive design from the ground up.
            </p>
            <p>
              With a background in AI development and a passion for social impact, Matthew
              recognized that the AI revolution presented both a challenge and an opportunity. The
              challenge: ensuring that cutting-edge technology doesn't leave anyone behind. The
              opportunity: to build systems that work better for everyone by centering the needs
              of those historically excluded.
            </p>
            <p className="text-primary font-semibold text-lg italic pt-4">
              "Technology doesn't truly work until it works for everyone. That's not just our
              mission—it's our measure of success."
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default Founder;