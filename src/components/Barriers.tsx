import { Code, Languages, Zap, Heart } from "lucide-react";

const Barriers = () => {
  const solutions = [
    {
      icon: Code,
      title: "Adaptive Code AI",
      description:
        "AI that writes accessible code by default, ensuring every interface works for screen readers, keyboard navigation, and assistive technologies.",
      color: "text-blue-400",
    },
    {
      icon: Languages,
      title: "AI As A Translator",
      description:
        "Breaking language barriers and translating complex interfaces into clear, understandable formats for users of all abilities.",
      color: "text-yellow-400",
    },
    {
      icon: Zap,
      title: "Experience as Expedience",
      description:
        "Transforming accessibility from a compliance checkbox into a seamless, fast, and intuitive user experience.",
      color: "text-pink-400",
    },
    {
      icon: Heart,
      title: "Lovable-Enabled Projects",
      description:
        "Empowering creators to build accessible-first applications with tools that make inclusion the easiest path forward.",
      color: "text-green-400",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Breaking Down Barriers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our technology doesn't just accommodate differences—it celebrates them.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full mb-6 group-hover:scale-110 transition-transform">
                <solution.icon className={`w-8 h-8 ${solution.color}`} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-16 p-8 bg-background rounded-xl border border-primary/20 text-center animate-fade-up">
          <p className="text-xl md:text-2xl font-semibold leading-relaxed">
            "Technology doesn't truly work until it works for{" "}
            <span className="text-primary">everyone</span>. That's not just our mission—it's our
            measure of success."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Barriers;
