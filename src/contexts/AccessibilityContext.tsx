import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilitySettings {
  snowEnabled: boolean;
  fontSize: number;
  highContrast: boolean;
  screenReader: boolean;
  reduceMotion: boolean;
  dyslexicFont: boolean;
  readingRuler: boolean;
  textToSpeech: boolean;
  speechRate: number;
  selectedVoice: string;
}

interface AccessibilityContextType extends AccessibilitySettings {
  setSnowEnabled: (enabled: boolean) => void;
  setFontSize: (size: number) => void;
  setHighContrast: (enabled: boolean) => void;
  setScreenReader: (enabled: boolean) => void;
  setReduceMotion: (enabled: boolean) => void;
  setDyslexicFont: (enabled: boolean) => void;
  setReadingRuler: (enabled: boolean) => void;
  setTextToSpeech: (enabled: boolean) => void;
  setSpeechRate: (rate: number) => void;
  setSelectedVoice: (voice: string) => void;
  resetToDefaults: () => void;
}

const defaultSettings: AccessibilitySettings = {
  snowEnabled: true,
  fontSize: 100,
  highContrast: false,
  screenReader: false,
  reduceMotion: false,
  dyslexicFont: false,
  readingRuler: false,
  textToSpeech: false,
  speechRate: 1,
  selectedVoice: "",
};

const STORAGE_KEY = "unmute1-accessibility";

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return { ...defaultSettings, ...JSON.parse(saved) };
        } catch {
          return defaultSettings;
        }
      }
    }
    return defaultSettings;
  });

  // Persist to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Apply font size
  useEffect(() => {
    document.documentElement.style.fontSize = `${settings.fontSize}%`;
  }, [settings.fontSize]);

  // Apply high contrast
  useEffect(() => {
    if (settings.highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [settings.highContrast]);

  // Apply reduced motion
  useEffect(() => {
    if (settings.reduceMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [settings.reduceMotion]);

  // Apply dyslexic font
  useEffect(() => {
    if (settings.dyslexicFont) {
      document.documentElement.classList.add("dyslexic-font");
    } else {
      document.documentElement.classList.remove("dyslexic-font");
    }
  }, [settings.dyslexicFont]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        ...settings,
        setSnowEnabled: (v) => updateSetting("snowEnabled", v),
        setFontSize: (v) => updateSetting("fontSize", v),
        setHighContrast: (v) => updateSetting("highContrast", v),
        setScreenReader: (v) => updateSetting("screenReader", v),
        setReduceMotion: (v) => updateSetting("reduceMotion", v),
        setDyslexicFont: (v) => updateSetting("dyslexicFont", v),
        setReadingRuler: (v) => updateSetting("readingRuler", v),
        setTextToSpeech: (v) => updateSetting("textToSpeech", v),
        setSpeechRate: (v) => updateSetting("speechRate", v),
        setSelectedVoice: (v) => updateSetting("selectedVoice", v),
        resetToDefaults,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};

// Backwards compatibility - useSnow now uses the accessibility context
export const useSnow = () => {
  const { snowEnabled, setSnowEnabled } = useAccessibility();
  return { snowEnabled, setSnowEnabled };
};
