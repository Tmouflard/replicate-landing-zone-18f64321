import { Check } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      title: "Artisans qualifiés RGE",
      description: "Une installation réalisée avec soins et de qualité grâce à nos artisans certifiés.",
    },
    {
      title: "Diagnostic rénovation",
      description: "Nos équipes vérifient la faisabilité de votre chantier et vous propose un diagnostic sur mesure.",
    },
    {
      title: "Matériaux de qualité",
      description: "Des matériaux certifiés pour répondre aux besoins thermiques de votre logement.",
    },
  ];

  return (
    <div className="w-full bg-white mt-24">
      <div className="py-24 space-y-16">
        <div className="container mx-auto space-y-6">
          <h2 className="text-primary text-3xl md:text-4xl font-bold text-center">
            DIMINUEZ VOS DÉPENSES ÉNERGÉTIQUES
          </h2>
          <p className="text-center text-lg max-w-4xl mx-auto">
            Si vous êtes propriétaire occupant ou locataire d'une maison individuelle et vous avez un revenu fiscal de référence inférieur à un certain montant (selon le nombre de personnes qui composent le ménage), vous êtes surement éligible aux aides sur vos travaux.{" "}
            <span className="text-[#F4A340] font-semibold">Faites le test !</span>
          </p>
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            REMPLIR LE FORMULAIRE D'ÉLIGIBILITÉ
          </button>
        </div>
      </div>
    </div>
  );
};