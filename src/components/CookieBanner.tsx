import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#F1F1F1] border-t border-gray-200 p-4 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre utilisation des cookies.
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="text-sm"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4 mr-1" />
            Refuser
          </Button>
          <Button
            size="sm"
            className="text-sm bg-primary hover:bg-primary/90"
            onClick={handleAccept}
          >
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
};