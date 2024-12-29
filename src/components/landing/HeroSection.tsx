import { Star } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-lg">
        <span className="font-bold">4,9/5</span>
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
        ))}
        <span className="text-gray-600">sur 3 261 avis</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold leading-tight space-y-4">
        <div>
          L'État finance votre{" "}
          <span className="bg-primary text-white px-2">Pompe à Chaleur</span>
        </div>
        <div>
          jusqu'à{" "}
          <span className="bg-accent text-white px-2">10 500 €</span>
        </div>
      </h1>

      <p className="text-xl text-gray-700">
        Ne laissez pas l'hiver vous surprendre. Agissez dès aujourd'hui
        pour un confort optimal et des économies durables.
      </p>
    </div>
  );
};