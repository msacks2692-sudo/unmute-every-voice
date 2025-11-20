import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { Accessibility, Type, Contrast, Volume, BookOpen, Ruler, Volume2 } from "lucide-react";

interface AccessibilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReadingRulerChange: (enabled: boolean) => void;
}

export const AccessibilityDialog = ({ open, onOpenChange, onReadingRulerChange }: AccessibilityDialogProps) => {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [readingRuler, setReadingRuler] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);

  useEffect(() => {
    // Apply font size
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    // Apply reduced motion
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  useEffect(() => {
    // Apply dyslexic font
    if (dyslexicFont) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }
  }, [dyslexicFont]);

  useEffect(() => {
    // Notify parent about reading ruler state
    onReadingRulerChange(readingRuler);
  }, [readingRuler, onReadingRulerChange]);

  useEffect(() => {
    // Apply text-to-speech functionality
    if (textToSpeech) {
      const handleTextSelection = () => {
        const selection = window.getSelection();
        const text = selection?.toString().trim();
        if (text && text.length > 0) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 0.9;
          utterance.pitch = 1;
          speechSynthesis.speak(utterance);
        }
      };

      document.addEventListener('mouseup', handleTextSelection);
      return () => {
        document.removeEventListener('mouseup', handleTextSelection);
        speechSynthesis.cancel();
      };
    } else {
      speechSynthesis.cancel();
    }
  }, [textToSpeech]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] shadow-elevated">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Accessibility className="w-6 h-6 text-primary" />
            Accessibility Features
          </DialogTitle>
          <DialogDescription>
            Customize your experience with AI-powered accessibility features
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="font-size" className="flex items-center gap-2 text-base font-semibold">
                <Type className="w-5 h-5 text-primary" />
                Text Size
              </Label>
              <span className="text-sm text-muted-foreground">{fontSize}%</span>
            </div>
            <Slider
              id="font-size"
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
              min={80}
              max={150}
              step={10}
              className="w-full"
            />
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card shadow-sm">
            <div className="flex items-start gap-3 flex-1">
              <Contrast className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-0.5">
                <Label htmlFor="high-contrast" className="text-base font-semibold cursor-pointer">
                  High Contrast Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Increase contrast for better visibility
                </p>
              </div>
            </div>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>

          {/* Screen Reader Optimization */}
          <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card shadow-sm">
            <div className="flex items-start gap-3 flex-1">
              <Volume className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-0.5">
                <Label htmlFor="screen-reader" className="text-base font-semibold cursor-pointer">
                  Screen Reader Optimized
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enhanced descriptions for screen readers
                </p>
              </div>
            </div>
            <Switch
              id="screen-reader"
              checked={screenReader}
              onCheckedChange={setScreenReader}
            />
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card shadow-sm">
            <div className="flex items-start gap-3 flex-1">
              <Accessibility className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-0.5">
                <Label htmlFor="reduce-motion" className="text-base font-semibold cursor-pointer">
                  Reduce Motion
                </Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations and transitions
                </p>
              </div>
            </div>
            <Switch
              id="reduce-motion"
              checked={reduceMotion}
              onCheckedChange={setReduceMotion}
            />
          </div>

          {/* Dyslexia-Friendly Font */}
          <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card shadow-sm">
            <div className="flex items-start gap-3 flex-1">
              <BookOpen className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-0.5">
                <Label htmlFor="dyslexic-font" className="text-base font-semibold cursor-pointer">
                  Dyslexia-Friendly Font
                </Label>
                <p className="text-sm text-muted-foreground">
                  Use OpenDyslexic font for easier reading
                </p>
              </div>
            </div>
            <Switch
              id="dyslexic-font"
              checked={dyslexicFont}
              onCheckedChange={setDyslexicFont}
            />
          </div>

          {/* Reading Ruler */}
          <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card shadow-sm">
            <div className="flex items-start gap-3 flex-1">
              <Ruler className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-0.5">
                <Label htmlFor="reading-ruler" className="text-base font-semibold cursor-pointer">
                  Reading Ruler
                </Label>
                <p className="text-sm text-muted-foreground">
                  Highlight text line to improve focus
                </p>
              </div>
            </div>
            <Switch
              id="reading-ruler"
              checked={readingRuler}
              onCheckedChange={setReadingRuler}
            />
          </div>

          {/* Text-to-Speech */}
          <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card shadow-sm">
            <div className="flex items-start gap-3 flex-1">
              <Volume2 className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-0.5">
                <Label htmlFor="text-to-speech" className="text-base font-semibold cursor-pointer">
                  Text-to-Speech
                </Label>
                <p className="text-sm text-muted-foreground">
                  Select text to hear it read aloud
                </p>
              </div>
            </div>
            <Switch
              id="text-to-speech"
              checked={textToSpeech}
              onCheckedChange={setTextToSpeech}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};