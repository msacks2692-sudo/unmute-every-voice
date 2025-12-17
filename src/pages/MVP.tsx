import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Mic, ArrowRight, Volume2, BookOpen, Bot, TrendingUp, CheckCircle, Loader2, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  full_name: z.string().optional(),
  interest_area: z.string().optional(),
});

const features = [
  {
    icon: Volume2,
    title: "AI Speech Tools",
    description: "Text-to-speech with customizable voices, speeds, and pitch controls for personalized listening.",
  },
  {
    icon: BookOpen,
    title: "Reading Aids",
    description: "Dyslexia-friendly fonts, reading rulers, and text customization for easier comprehension.",
  },
  {
    icon: Bot,
    title: "Smart AI Agents",
    description: "AI assistants that help with summarization, image descriptions, and conversational support.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Track your learning milestones and achievements as you grow with our tools.",
  },
];

const MVP = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [interestArea, setInterestArea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validated = signupSchema.parse({ email, full_name: fullName, interest_area: interestArea });

      // Insert new signup
      const { error } = await supabase.from("early_access_signups").insert({
        email: validated.email,
        full_name: validated.full_name || null,
        interest_area: validated.interest_area || null,
      });

      if (error) {
        // Handle duplicate email error (unique constraint violation)
        if (error.code === "23505") {
          toast({
            title: "Already signed up!",
            description: "This email is already on our early access list.",
            variant: "default",
          });
          setIsLoading(false);
          return;
        }
        throw error;
      }

      setIsSuccess(true);
      toast({
        title: "You're on the list!",
        description: "We'll notify you when we launch. Thank you for joining!",
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: "Invalid input",
          description: err.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        {/* Decorative blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="inline-flex items-center gap-1 text-4xl md:text-5xl font-black tracking-tighter">
                UNMUTE
                <span className="text-primary inline-flex items-baseline">
                  1
                  <Mic className="w-6 h-6 md:w-8 md:h-8 ml-1" />
                </span>
              </Link>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Be the First to Experience
              <br />
              <span className="text-primary">AI-Powered Accessibility</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Join our early access program and help shape the future of accessible AI technology.
            </motion.p>

            {/* Signup Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-md mx-auto"
            >
              {isSuccess ? (
                <div className="bg-card p-8 rounded-xl shadow-elevated border border-border text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto" />
                  <h3 className="text-xl font-semibold">You're on the list!</h3>
                  <p className="text-muted-foreground">
                    We'll send you an email when we're ready to launch. Thank you for joining Unmute1!
                  </p>
                  <Link to="/">
                    <Button variant="outline" className="mt-4">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card p-6 md:p-8 rounded-xl shadow-elevated border border-border space-y-4">
                  <div className="space-y-2 text-left">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <Label htmlFor="fullName">Full Name (optional)</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <Label htmlFor="interestArea">What interests you most?</Label>
                    <Select value={interestArea} onValueChange={setInterestArea}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select an area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="speech-tools">Speech Tools</SelectItem>
                        <SelectItem value="reading-aids">Reading Aids</SelectItem>
                        <SelectItem value="ai-agents">AI Agents</SelectItem>
                        <SelectItem value="all-features">All Features</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full group"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing up...
                      </>
                    ) : (
                      <>
                        Get Early Access
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>No spam</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>Cancel anytime</span>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explainer Video Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See It in Action</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Watch how Unmute1 transforms accessibility with AI-powered tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/20 rounded-2xl overflow-hidden shadow-elevated border border-border">
              {/* Placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-primary/30">
                  <Play className="w-10 h-10 text-primary ml-1" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">Explainer Video Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  We're creating a video to showcase how Unmute1 empowers accessibility. Check back soon!
                </p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute bottom-4 right-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Feature Highlights</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover the powerful accessibility tools we're building to empower every voice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card p-6 rounded-xl border border-border shadow-md hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Link to="/" className="inline-flex items-center gap-1 text-xl font-black tracking-tighter mb-4">
            UNMUTE
            <span className="text-primary inline-flex items-baseline">
              1
              <Mic className="w-3 h-3 ml-0.5" />
            </span>
          </Link>
          <p className="text-sm text-secondary-foreground/70">
            © {new Date().getFullYear()} Unmute1. Empowering every voice through accessible AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MVP;