import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Accessibility } from "lucide-react";
import { AccessibilityDialog } from "./AccessibilityDialog";

export const AccessibilityButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showInitialDialog, setShowInitialDialog] = useState(false);

  useEffect(() => {
    // Check if user has seen the accessibility dialog before
    const hasSeenDialog = localStorage.getItem('hasSeenAccessibilityDialog');
    if (!hasSeenDialog) {
      // Show dialog after a short delay
      const timer = setTimeout(() => {
        setShowInitialDialog(true);
        setDialogOpen(true);
        localStorage.setItem('hasSeenAccessibilityDialog', 'true');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setDialogOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-elevated hover:shadow-2xl transition-all duration-300 z-50 p-0"
        size="icon"
        aria-label="Open accessibility settings"
      >
        <Accessibility className="w-6 h-6" />
      </Button>

      {/* Accessibility Dialog */}
      <AccessibilityDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};