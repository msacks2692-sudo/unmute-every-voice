import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hand, ChevronLeft, ChevronRight, RotateCcw, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import aslHello from "@/assets/asl-hello.png";
import aslThankYou from "@/assets/asl-thankyou.png";
import aslPlease from "@/assets/asl-please.png";
import aslHelp from "@/assets/asl-help.png";
import aslILoveYou from "@/assets/asl-iloveyou.png";

const signs = [
  {
    word: "Hello",
    emoji: "👋",
    image: aslHello,
    steps: [
      "Open your dominant hand with fingers together",
      "Place your hand near your forehead (like a salute)",
      "Move your hand outward and away from your head",
      "End with your palm facing forward",
    ],
    tip: "This is similar to a friendly wave — think of it as a salute that opens outward.",
  },
  {
    word: "Thank You",
    emoji: "🙏",
    image: aslThankYou,
    steps: [
      "Touch your chin or lips with your fingertips",
      "Your hand should be flat with fingers together",
      "Move your hand forward and slightly down",
      "End with your palm facing up, as if offering something",
    ],
    tip: "Imagine blowing a kiss of gratitude — the motion flows from your mouth outward.",
  },
  {
    word: "Please",
    emoji: "🤲",
    image: aslPlease,
    steps: [
      "Place your flat, open hand on your chest",
      "Fingers should be together and pointing up slightly",
      "Move your hand in a circular motion on your chest",
      "Keep the motion smooth and continuous",
    ],
    tip: "Think of rubbing your heart — it conveys sincerity and politeness.",
  },
  {
    word: "Help",
    emoji: "🆘",
    image: aslHelp,
    steps: [
      "Make a fist with your dominant hand (thumbs-up shape)",
      "Place the fist on your open, flat non-dominant palm",
      "Lift both hands together upward",
      "The open hand 'supports' the fist as it rises",
    ],
    tip: "Your open hand is literally lifting and supporting — a visual metaphor for help.",
  },
  {
    word: "I Love You",
    emoji: "🤟",
    image: aslILoveYou,
    steps: [
      "Extend your thumb, index finger, and pinky finger",
      "Keep your middle and ring fingers folded down",
      "Hold your hand up with palm facing forward",
      "This combines the letters I, L, and Y in ASL",
    ],
    tip: "This iconic sign merges three letters into one powerful gesture — universally recognized!",
  },
];

const ASLDemo = () => {
  const [currentSign, setCurrentSign] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const sign = signs[currentSign];

  const nextSign = () => {
    setCurrentSign((prev) => (prev + 1) % signs.length);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const prevSign = () => {
    setCurrentSign((prev) => (prev - 1 + signs.length) % signs.length);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const playSteps = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= sign.steps.length) {
        clearInterval(interval);
        setIsPlaying(false);
      } else {
        setCurrentStep(step);
      }
    }, 1500);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Hand className="w-4 h-4" />
            Learn ASL Basics
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Try Common <span className="text-primary">ASL Signs</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow along step-by-step and learn essential signs used in everyday conversation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Sign selector pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {signs.map((s, i) => (
              <button
                key={s.word}
                onClick={() => {
                  setCurrentSign(i);
                  setCurrentStep(0);
                  setIsPlaying(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  i === currentSign
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {s.emoji} {s.word}
              </button>
            ))}
          </div>

          <Card className="p-6 md:p-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" size="icon" onClick={prevSign} aria-label="Previous sign">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <AnimatePresence mode="wait">
                <motion.div
                  key={sign.word}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center"
                >
                  <span className="text-5xl mb-2 block">{sign.emoji}</span>
                  <h3 className="text-2xl font-bold">{sign.word}</h3>
                </motion.div>
              </AnimatePresence>
              <Button variant="ghost" size="icon" onClick={nextSign} aria-label="Next sign">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Content: illustration + steps */}
            <div className="grid md:grid-cols-[220px_1fr] gap-6 mb-8">
              {/* Illustration */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={sign.word}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <div className="w-48 h-48 md:w-52 md:h-52 rounded-2xl overflow-hidden bg-muted/30 border border-border/50 shadow-lg">
                    <img
                      src={sign.image}
                      alt={`ASL sign for ${sign.word}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Steps */}
              <div className="space-y-3">
                {sign.steps.map((step, i) => (
                  <motion.div
                    key={`${sign.word}-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                      i === currentStep
                        ? "bg-primary/10 ring-2 ring-primary/30"
                        : i < currentStep
                        ? "bg-muted/50 opacity-60"
                        : "bg-muted/30 opacity-40"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-colors duration-300 ${
                        i === currentStep
                          ? "bg-primary text-primary-foreground"
                          : i < currentStep
                          ? "bg-primary/30 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <p className="text-sm pt-1">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="bg-accent/30 border border-accent rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">💡 Tip:</span> {sign.tip}
              </p>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
              <Button variant="outline" size="sm" onClick={reset} disabled={isPlaying}>
                <RotateCcw className="w-4 h-4 mr-1" /> Reset
              </Button>
              <Button size="sm" onClick={playSteps} disabled={isPlaying}>
                <Play className="w-4 h-4 mr-1" /> {isPlaying ? "Playing..." : "Play Steps"}
              </Button>
            </div>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            These are simplified descriptions. For proper learning, we recommend practicing with a qualified ASL instructor.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ASLDemo;
