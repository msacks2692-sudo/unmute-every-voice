import { Eye, Ear, Users, Zap } from "lucide-react";

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
          <h2 className="text-4xl md:text-5xl font-bold animate-fade-up">
            We envision a world where accessibility
            <br />
            <span className="text-primary">isn't an afterthought</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-up">
            It's the foundation of every technological advancement. Where AI doesn't just serve the
            majority, but empowers every voice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
