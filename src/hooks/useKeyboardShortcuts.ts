import { useEffect, useCallback } from "react";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export const useKeyboardShortcuts = () => {
  const {
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion,
    readingRuler,
    setReadingRuler,
    textToSpeech,
    setTextToSpeech,
    fontSize,
    setFontSize,
  } = useAccessibility();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Only trigger with Alt + Shift + key combination
      if (!event.altKey || !event.shiftKey) return;

      switch (event.key.toLowerCase()) {
        case "c":
          // Alt + Shift + C: Toggle high contrast
          event.preventDefault();
          setHighContrast(!highContrast);
          break;
        case "m":
          // Alt + Shift + M: Toggle reduce motion
          event.preventDefault();
          setReduceMotion(!reduceMotion);
          break;
        case "r":
          // Alt + Shift + R: Toggle reading ruler
          event.preventDefault();
          setReadingRuler(!readingRuler);
          break;
        case "t":
          // Alt + Shift + T: Toggle text-to-speech
          event.preventDefault();
          setTextToSpeech(!textToSpeech);
          break;
        case "+":
        case "=":
          // Alt + Shift + +: Increase font size
          event.preventDefault();
          setFontSize(Math.min(150, fontSize + 10));
          break;
        case "-":
          // Alt + Shift + -: Decrease font size
          event.preventDefault();
          setFontSize(Math.max(80, fontSize - 10));
          break;
      }
    },
    [
      highContrast,
      setHighContrast,
      reduceMotion,
      setReduceMotion,
      readingRuler,
      setReadingRuler,
      textToSpeech,
      setTextToSpeech,
      fontSize,
      setFontSize,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};
