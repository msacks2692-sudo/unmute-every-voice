import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, Hand, MessageSquare, Sparkles } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const VideoDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const conversationSteps = [
    { time: "0:00", speaker: "Doctor", text: "How are you feeling today?", asl: "Translating to ASL..." },
    { time: "0:03", speaker: "Patient (ASL)", text: "Signs: 'Head hurts, three days'", asl: "Recognizing signs..." },
    { time: "0:06", speaker: "AI Translation", text: "I've had a headache for three days.", asl: "Text generated ✓" },
    { time: "0:09", speaker: "Doctor", text: "Have you taken any medication?", asl: "Translating to ASL..." },
    { time: "0:12", speaker: "Patient (ASL)", text: "Signs: 'Yes, aspirin, not help'", asl: "Recognizing signs..." },
    { time: "0:15", speaker: "AI Translation", text: "Yes, I tried aspirin but it didn't help.", asl: "Text generated ✓" },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handlePlayDemo = () => {
    setIsPlaying(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= conversationSteps.length) {
        setIsPlaying(false);
        setActiveStep(0);
        clearInterval(interval);
      } else {
        setActiveStep(step);
      }
    }, 3000);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm border-primary/30 bg-primary/5">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            Live Demo
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            See ASL Translation in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how our AI-powered system bridges communication between Deaf patients 
            and healthcare providers in real-time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Video Player Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-card to-muted border border-border shadow-2xl">
              {/* Video placeholder with animated content */}
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 relative flex items-center justify-center">
                {/* Simulated video content */}
                <div className="absolute inset-0 flex">
                  {/* Left side - Doctor */}
                  <div className="w-1/2 border-r border-white/10 flex flex-col items-center justify-center p-4">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                      <MessageSquare className="w-10 h-10 text-primary" />
                    </div>
                    <span className="text-white/80 text-sm font-medium">Healthcare Provider</span>
                    <span className="text-white/50 text-xs mt-1">Speaking English</span>
                  </div>
                  
                  {/* Right side - Patient */}
                  <div className="w-1/2 flex flex-col items-center justify-center p-4">
                    <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-3">
                      <Hand className="w-10 h-10 text-secondary" />
                    </div>
                    <span className="text-white/80 text-sm font-medium">Deaf Patient</span>
                    <span className="text-white/50 text-xs mt-1">Using ASL</span>
                  </div>
                </div>

                {/* AI Translation overlay */}
                <motion.div 
                  className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 border border-primary/30"
                  animate={{ opacity: isPlaying ? 1 : 0.7 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-primary text-xs font-medium">AI Translation Active</span>
                  </div>
                  <p className="text-white text-sm">
                    {isPlaying ? conversationSteps[activeStep].text : "Click play to see the demo"}
                  </p>
                </motion.div>

                {/* Play button overlay */}
                {!isPlaying && (
                  <motion.button
                    onClick={handlePlayDemo}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                  </motion.button>
                )}
              </div>

              {/* Video controls */}
              <div className="bg-card/80 backdrop-blur-sm p-4 flex items-center justify-between border-t border-border">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => isPlaying ? setIsPlaying(false) : handlePlayDemo()}
                    className="h-9 w-9"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="h-9 w-9"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {conversationSteps[activeStep].time} / 0:18
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Demo note */}
            <p className="text-center text-xs text-muted-foreground mt-4">
              * This is a simulated demo. Actual product uses real-time video processing.
            </p>
          </motion.div>

          {/* Conversation Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Conversation Timeline
            </h3>

            {conversationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  activeStep === index && isPlaying
                    ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                    : "bg-card/50 border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Badge 
                      variant={step.speaker.includes("ASL") ? "secondary" : step.speaker.includes("AI") ? "default" : "outline"}
                      className="text-xs"
                    >
                      {step.time}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground mb-1">{step.speaker}</p>
                    <p className="text-muted-foreground text-sm">{step.text}</p>
                    <p className="text-xs text-primary/70 mt-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {step.asl}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="pt-4">
              <Button 
                onClick={handlePlayDemo}
                disabled={isPlaying}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Play className="w-4 h-4 mr-2" />
                {isPlaying ? "Demo Playing..." : "Watch Full Demo"}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Key features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: Hand, title: "Real-time Recognition", desc: "ASL signs detected and processed instantly" },
            { icon: MessageSquare, title: "Natural Translation", desc: "Context-aware, grammatically correct output" },
            { icon: Sparkles, title: "98.5% Accuracy", desc: "Industry-leading recognition precision" },
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-card/50 border border-border">
              <feature.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoDemo;
