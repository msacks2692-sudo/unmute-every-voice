import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Accessibility, Type, Contrast, Volume, BookOpen, Ruler, Volume2, Snowflake, RotateCcw } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface AccessibilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReadingRulerChange: (enabled: boolean) => void;
}

export const AccessibilityDialog = ({ open, onOpenChange, onReadingRulerChange }: AccessibilityDialogProps) => {
  const {
    snowEnabled,
    setSnowEnabled,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    screenReader,
    setScreenReader,
    reduceMotion,
    setReduceMotion,
    dyslexicFont,
    setDyslexicFont,
    readingRuler,
    setReadingRuler,
    textToSpeech,
    setTextToSpeech,
    speechRate,
    setSpeechRate,
    selectedVoice,
    setSelectedVoice,
    resetToDefaults,
  } = useAccessibility();

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    onReadingRulerChange(readingRuler);
  }, [readingRuler, onReadingRulerChange]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
      if (voices.length > 0 && !selectedVoice) {
        setSelectedVoice(voices[0].name);
      }
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [selectedVoice, setSelectedVoice]);

  useEffect(() => {
    if (textToSpeech) {
      const handleTextSelection = () => {
        const selection = window.getSelection();
        const text = selection?.toString().trim();
        if (text && text.length > 0) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = speechRate;
          utterance.pitch = 1;
          
          const voice = availableVoices.find(v => v.name === selectedVoice);
          if (voice) {
            utterance.voice = voice;
          }
          
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
  }, [textToSpeech, speechRate, selectedVoice, availableVoices]);

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

          {/* Snow Effect Toggle */}
          <div className="flex items-center justify-between space-x-4 p-4 rounded-lg border bg-card shadow-sm">
            <div className="flex items-start gap-3 flex-1">
              <Snowflake className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-0.5">
                <Label htmlFor="snow-effect" className="text-base font-semibold cursor-pointer">
                  Snow Effect
                </Label>
                <p className="text-sm text-muted-foreground">
                  Toggle falling snow animation
                </p>
              </div>
            </div>
            <Switch
              id="snow-effect"
              checked={snowEnabled}
              onCheckedChange={setSnowEnabled}
            />
          </div>

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
          <div className="space-y-4 p-4 rounded-lg border bg-card shadow-sm">
            <div className="flex items-center justify-between space-x-4">
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

            {textToSpeech && (
              <div className="space-y-4 pl-8 pt-2">
                {/* Voice Selection */}
                <div className="space-y-2">
                  <Label htmlFor="voice-select" className="text-sm font-medium">
                    Voice
                  </Label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger id="voice-select" className="w-full">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVoices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Speed Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="speech-rate" className="text-sm font-medium">
                      Reading Speed
                    </Label>
                    <span className="text-sm text-muted-foreground">{speechRate.toFixed(1)}x</span>
                  </div>
                  <Slider
                    id="speech-rate"
                    value={[speechRate]}
                    onValueChange={(value) => setSpeechRate(value[0])}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={resetToDefaults}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
