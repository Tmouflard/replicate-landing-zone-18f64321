import { MessageSquare } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white/50 py-4 fixed top-0 left-0 z-50 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/42c5a37e-e57d-456c-892f-88476539af62.png" alt="Action Écologie Logo" className="h-12" />
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