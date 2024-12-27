import { CheckCircle2 } from "lucide-react";

export const BenefitsList = () => {
  const benefits = [
    "Installation par des professionnels agréés RGE",
    "Jusqu'à 30% d'économies sur votre facture",
    "Gagnez votre indépendance énergétique !",
    "Accompagnement et expertise tout au long de la procédure",
  ];

  return (
    <div className="space-y-4">
      {benefits.map((text, index) => (
        <div key={index} className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
          <span className="text-lg">{text}</span>
        </div>
      ))}
    </div>
  );
};