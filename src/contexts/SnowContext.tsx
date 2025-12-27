import { createContext, useContext, useState, ReactNode } from "react";

interface SnowContextType {
  snowEnabled: boolean;
  setSnowEnabled: (enabled: boolean) => void;
}

const SnowContext = createContext<SnowContextType | undefined>(undefined);

export const SnowProvider = ({ children }: { children: ReactNode }) => {
  const [snowEnabled, setSnowEnabled] = useState(true);

  return (
    <SnowContext.Provider value={{ snowEnabled, setSnowEnabled }}>
      {children}
    </SnowContext.Provider>
  );
};

export const useSnow = () => {
  const context = useContext(SnowContext);
  if (context === undefined) {
    throw new Error("useSnow must be used within a SnowProvider");
  }
  return context;
};
