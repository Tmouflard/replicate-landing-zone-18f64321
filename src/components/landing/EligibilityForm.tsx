
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { submitToLeadbyte } from "@/services/leadbyteService";
import { incrementStepVisit, updateFormStats } from "@/services/statsService";
import { isValidFrenchPhoneNumber, isValidFrenchPostalCode } from "@/utils/validators";
import { supabase } from "@/integrations/supabase/client";

export const EligibilityForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState({
    heatingType: "",
    income: "",
    householdSize: "",
    isOwner: "",
    name: "",
    email: "",
    postal: "",
    phone: "",
    cookiesConsent: false,
  });

  // Tracker le début du formulaire
  useEffect(() => {
    updateFormStats('start');
  }, []);

  // Tracker les visites par étape
  useEffect(() => {
    const stepName = steps[currentStep].title;
    incrementStepVisit(currentStep + 1, stepName);
  }, [currentStep]);

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
        }, 300);
      }
    }
  };

  const handleNext = () => {
    const currentField = steps[currentStep].field || steps[currentStep].fields?.[0];
    if (!formData[currentField as keyof typeof formData]) {
      toast.error("Cette question est obligatoire");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const lastStep = steps[steps.length - 1];
    const requiredFields = lastStep.fields || [lastStep.field];
    
    // Vérification des champs obligatoires
    const isValid = requiredFields.every(
      (field) => formData[field as keyof typeof formData]
    );

    if (!isValid) {
      toast.error("Tous les champs sont obligatoires");
      updateFormStats('error');
      return;
    }

    // Validation du numéro de téléphone français
    if (!isValidFrenchPhoneNumber(formData.phone)) {
      toast.error("Veuillez entrer un numéro de téléphone français valide");
      updateFormStats('error');
      return;
    }

    // Validation du code postal français
    if (!isValidFrenchPostalCode(formData.postal)) {
      toast.error("Veuillez entrer un code postal français valide");
      updateFormStats('error');
      return;
    }

    if (!formData.cookiesConsent) {
      toast.error("Veuillez accepter les conditions d'utilisation");
      updateFormStats('error');
      return;
    }

    try {
      // Envoyer à Leadbyte
      const result = await submitToLeadbyte(formData);
      
      // Sauvegarder dans Supabase
      await supabase.from('form_submissions').insert([{
        heating_type: formData.heatingType,
        income: formData.income,
        household_size: formData.householdSize,
        is_owner: formData.isOwner,
        name: formData.name,
        email: formData.email,
        postal: formData.postal,
        phone: formData.phone,
        leadbyte_response: result
      }]);

      updateFormStats('success');
      navigate('/merci');
    } catch (error) {
      console.error('Error:', error);
      updateFormStats('error');
      // En cas d'erreur, on redirige quand même vers la page de remerciement
      navigate('/merci');
    }
  };

  const steps = [
    {
      title: "Type de chauffage",
      field: "heatingType",
      component: (
        <div className="space-y-4">
          <Label>Quel est votre type de chauffage actuel ?*</Label>
          <RadioGroup
            value={formData.heatingType}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "heatingType", value } })
            }
            className="grid grid-cols-1 gap-4"
            required
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
          <Label>Quel est votre revenu fiscal de référence ?*</Label>
          <RadioGroup
            value={formData.income}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "income", value } })
            }
            className="grid grid-cols-1 gap-4"
            required
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
          <Label>Combien de personnes composent votre foyer ?*</Label>
          <RadioGroup
            value={formData.householdSize}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "householdSize", value } })
            }
            className="grid grid-cols-3 gap-4"
            required
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
          <Label>Êtes-vous propriétaire de votre logement ?*</Label>
          <RadioGroup
            value={formData.isOwner}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "isOwner", value } })
            }
            className="grid grid-cols-2 gap-4"
            required
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
            <Label htmlFor="name">Nom et Prénom*</Label>
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
            <Label htmlFor="email">Email*</Label>
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
            <Label htmlFor="postal">Code Postal*</Label>
            <Input
              id="postal"
              type="text"
              name="postal"
              value={formData.postal}
              placeholder="75000"
              onChange={handleInputChange}
              required
              pattern="^(?:0[1-9]|[1-8][0-9]|9[0-5]|97|98|99)[0-9]{3}$"
              title="Veuillez entrer un code postal français valide"
            />
          </div>
          <div>
            <Label htmlFor="phone">Téléphone*</Label>
            <Input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="06 12 34 56 78"
              onChange={handleInputChange}
              required
              pattern="^0[1-9][0-9]{8}$"
              title="Veuillez entrer un numéro de téléphone français valide"
            />
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl p-8 eligibility-form">
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

        <form 
          onSubmit={isLastStep ? handleSubmit : handleNext} 
          className="space-y-6"
          data-netlify="true"
          name="eligibility-form"
          method="POST"
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="eligibility-form" />
          <p className="hidden">
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </p>

          <div className="min-h-[300px]">
            <h3 className="text-lg font-semibold mb-4">{currentStepData.title}</h3>
            {currentStepData.component}
          </div>

          {isLastStep && (
            <div className="flex items-start space-x-2">
              <Checkbox
                id="cookiesConsent"
                checked={formData.cookiesConsent}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, cookiesConsent: checked as boolean }))
                }
              />
              <label
                htmlFor="cookiesConsent"
                className="text-xs text-gray-500 cursor-pointer"
              >
                J'accepte de recevoir les détails de mon éligibilité au programme d'aides.{" "}
                <button 
                  type="button"
                  onClick={() => setShowDetails(true)}
                  className="text-accent hover:underline"
                >
                  Détails
                </button>
                . Vous disposez du droit de vous inscrire sur la liste d'opposition au démarchage téléphonique{" "}
                <a 
                  href="https://www.bloctel.gouv.fr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Bloctel
                </a>
                .
              </label>
            </div>
          )}

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
            <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90 text-white">
              {isLastStep ? "Obtenir mon éligibilité >>" : "Continuer"}
            </Button>
          </div>
        </form>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="space-y-4 text-gray-700">
            <p>
              Dans le cadre de l'utilisation du Site, les Utilisateurs consentent expressément à être contactés par VosDevis ou par l'un des partenaires suivants : Habitat Presto, Maison.fr, Renovation Man, Hello Artisan, Yes Travaux par téléphone, courrier électronique ou sms.
            </p>
            <p>
              Conformément au Code de la Consommation, les Utilisateurs disposent d'un droit d'opposition au démarchage téléphonique en s'inscrivant gratuitement sur la liste d'opposition Bloctel. Si les Utilisateurs ne souhaitent plus être contactés par Vos-devis, ou par l'un de ses partenaires, les Utilisateurs peuvent leur indiquer directement, ou en informer Vos-devis, via la page Contact afin que Vos-devis transmette leur demande aux partenaires concernés.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

