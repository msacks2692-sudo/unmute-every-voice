import { Accessibility, Brain, Globe } from "lucide-react";

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
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The numbers tell a story of
            <br />
            <span className="text-primary">untapped potential</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            When we design for accessibility, we innovate for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl group animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:scale-110 transition-transform">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className={`text-5xl md:text-6xl font-black mb-3 ${stat.color}`}>
                {stat.value}
              </div>
              <p className="text-muted-foreground leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-16 p-8 bg-primary/5 rounded-xl border border-primary/20 text-center animate-fade-up">
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            "When we center the margins, we improve the experience for everyone.
            <br />
            <span className="text-primary font-semibold">That's the Unmute1 promise.</span>"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Impact;
