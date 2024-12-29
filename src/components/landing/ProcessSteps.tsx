import { MousePointer, CheckSquare, Calendar, Fan } from "lucide-react";

const steps = [
  {
    icon: MousePointer,
    title: "1. Remplir le formulaire d'éligibilité",
  },
  {
    icon: CheckSquare,
    title: "2. Vérification de l'éligibilité",
  },
  {
    icon: Calendar,
    title: "3. Prise de rendez-vous pour l'installation",
  },
  {
    icon: Fan,
    title: "4. Mise en place de votre Pompe à Chaleur",
  },
];

export const ProcessSteps = () => {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center text-primary mb-12">
        COMMENT PROFITER DES AIDES D'ÉTAT POUR VOTRE POMPE À CHALEUR ?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center text-center">
            <step.icon className="w-12 h-12 text-primary mb-4" />
            <p className="font-medium">{step.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};