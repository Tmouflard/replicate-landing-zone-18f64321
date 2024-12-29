import { MessageSquare } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white/50 py-4 fixed top-0 left-0 z-50 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/91df6bf2-1b18-48dd-bd76-6becaf38b048.png" alt="Expert Rénovation Logo" className="h-8" />
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Nouveau barème MaPrimeRénov' 2025 disponible</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;