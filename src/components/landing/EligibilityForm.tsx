import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const EligibilityForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    heatingType: "",
    income: "",
    householdSize: "",
    isOwner: "",
    name: "",
    email: "",
    postal: "",
    phone: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Automatically move to next step for radio inputs
    const currentField = steps[currentStep].field;
    if (currentField && name === currentField) {
      if (currentStep < steps.length - 1) {
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, 300); // Small delay for better UX
      }
    }
  };

  const handleNext = () => {
    const currentField = steps[currentStep].field || steps[currentStep].fields?.[0];
    if (!formData[currentField as keyof typeof formData]) {
      toast.error("Veuillez répondre à la question pour continuer");
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lastStep = steps[steps.length - 1];
    const requiredFields = lastStep.fields || [lastStep.field];
    const isValid = requiredFields.every(
      (field) => formData[field as keyof typeof formData]
    );

    if (!isValid) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    toast.success("Votre demande a été envoyée avec succès!");
  };

  const steps = [
    {
      title: "Type de chauffage",
      field: "heatingType",
      component: (
        <div className="space-y-4">
          <Label>Quel est votre type de chauffage actuel ?</Label>
          <RadioGroup
            value={formData.heatingType}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "heatingType", value } })
            }
            className="grid grid-cols-1 gap-4"
          >
            {["Fioul", "Gaz", "Électrique"].map((type) => (
              <label
                key={type}
                className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              >
                <RadioGroupItem value={type.toLowerCase()} id={type} />
                <span>{type}</span>
              </label>
            ))}
          </RadioGroup>
        </div>
      ),
    },
    {
      title: "Revenu fiscal",
      field: "income",
      component: (
        <div className="space-y-4">
          <Label>Quel est votre revenu fiscal de référence ?</Label>
          <RadioGroup
            value={formData.income}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "income", value } })
            }
            className="grid grid-cols-1 gap-4"
          >
            {[
              { label: "0 € - 15 250 €", value: "0-15250" },
              { label: "15 251 € - 30 000 €", value: "15251-30000" },
              { label: "Plus de 30 000 €", value: "30001+" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <span>{option.label}</span>
              </label>
            ))}
          </RadioGroup>
        </div>
      ),
    },
    {
      title: "Composition du foyer",
      field: "householdSize",
      component: (
        <div className="space-y-4">
          <Label>Combien de personnes composent votre foyer ?</Label>
          <RadioGroup
            value={formData.householdSize}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "householdSize", value } })
            }
            className="grid grid-cols-3 gap-4"
          >
            {[1, 2, 3, 4, 5, "plus de 5"].map((number) => (
              <label
                key={number}
                className="flex items-center justify-center border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              >
                <RadioGroupItem value={String(number)} id={String(number)} />
                <span className="ml-2">{number}</span>
              </label>
            ))}
          </RadioGroup>
        </div>
      ),
    },
    {
      title: "Propriétaire",
      field: "isOwner",
      component: (
        <div className="space-y-4">
          <Label>Êtes-vous propriétaire de votre logement ?</Label>
          <RadioGroup
            value={formData.isOwner}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "isOwner", value } })
            }
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Oui", value: "oui" },
              { label: "Non", value: "non" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center justify-center border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </RadioGroup>
        </div>
      ),
    },
    {
      title: "Vos coordonnées",
      fields: ["name", "email", "postal", "phone"],
      component: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nom et Prénom</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              placeholder="Votre nom complet"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              placeholder="votre@email.com"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="postal">Code Postal</Label>
            <Input
              id="postal"
              type="text"
              name="postal"
              value={formData.postal}
              placeholder="75000"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="06 12 34 56 78"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          CALCULEZ VOTRE <span className="text-accent">PRIME</span>
        </h2>
        <p className="text-gray-600">
          Gratuit, sans engagement et ça ne prend que quelques minutes !
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Étape {currentStep + 1} sur {steps.length}
          </span>
          <span className="text-sm font-medium">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-accent rounded-full h-2 transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <form onSubmit={isLastStep ? handleSubmit : handleNext} className="space-y-6">
        <div className="min-h-[300px]">
          <h3 className="text-lg font-semibold mb-4">{currentStepData.title}</h3>
          {currentStepData.component}
        </div>

        <div className="flex gap-4">
          {currentStep > 0 && (
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleBack}
            >
              Retour
            </Button>
          )}
          <Button type="submit" className="flex-1">
            {isLastStep ? "Calculer Mes Aides" : "Continuer"}
          </Button>
        </div>

        {isLastStep && (
          <p className="text-xs text-gray-500 mt-4">
            COOKIES CONSENT : En soumettant cette demande, vous acceptez d'être
            contacté par téléphone et de recevoir des emails de la part des
            partenaires pour le suivi de votre demande et la mission commerciale qui
            peut en découler. Vous disposez du droit de vous inscrire sur la liste
            d'opposition au démarchage téléphonique Bloctel ici. Pour en savoir plus
            sur la gestion de vos données personnelles et exercer vos droits,
            consultez notre{" "}
            <a href="#" className="text-primary underline">
              politique de confidentialité des données
            </a>
            .
          </p>
        )}
      </form>
    </div>
  );
};