import { Star } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="space-y-12 lg:space-y-16">
      <div className="flex flex-col items-center lg:items-start gap-2 text-base md:text-lg">
        <div className="flex items-center gap-2">
          <span className="font-bold">4,9/5</span>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent" />
          ))}
          <span className="text-gray-600">sur 3 261 avis</span>
        </div>
      </div>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight space-y-8 text-center lg:text-left">
        <div>
          L'État finance votre{" "}
          <span className="bg-primary text-white px-2">Pompe à Chaleur</span>
        </div>
        <div>
          jusqu'à{" "}
          <span className="bg-accent text-white px-2">10 500 €</span>
        </div>
      </h1>

      <p className="hidden md:block text-xl lg:text-2xl text-gray-700 text-center lg:text-left">
        Ne laissez pas l'hiver vous surprendre. Agissez dès aujourd'hui
        pour un confort optimal et des économies durables.
      </p>
    </div>
  );
};