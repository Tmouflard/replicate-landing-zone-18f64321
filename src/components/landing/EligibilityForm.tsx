import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const EligibilityForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    postal: "",
    phone: "",
    heatingType: "",
    income: "",
    householdSize: "",
    isOwner: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Votre demande a été envoyée avec succès!");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nom et Prénom</Label>
            <Input
              id="name"
              type="text"
              name="name"
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
              placeholder="06 12 34 56 78"
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="heatingType">Type de chauffage</Label>
            <select
              id="heatingType"
              name="heatingType"
              className="w-full p-3 border rounded-lg text-gray-600"
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionnez votre type de chauffage</option>
              <option value="fioul">Fioul</option>
              <option value="gaz">Gaz</option>
              <option value="electrique">Électrique</option>
            </select>
          </div>

          <div>
            <Label htmlFor="income">Revenu fiscal</Label>
            <select
              id="income"
              name="income"
              className="w-full p-3 border rounded-lg text-gray-600"
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionnez votre tranche de revenus</option>
              <option value="0-15250">0 € - 15 250 €</option>
              <option value="15251-30000">15 251 € - 30 000 €</option>
              <option value="30001+">Plus de 30 000 €</option>
            </select>
          </div>

          <div>
            <Label>Nombre de personnes dans votre foyer</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[1, 2, 3, 4, 5, "plus de 5"].map((number) => (
                <label key={number} className="flex items-center">
                  <input
                    type="radio"
                    name="householdSize"
                    value={number}
                    className="mr-2"
                    onChange={handleInputChange}
                  />
                  <span>{number}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label>Êtes vous propriétaire de la maison?</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isOwner"
                  value="oui"
                  className="mr-2"
                  onChange={handleInputChange}
                />
                <span>Oui</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isOwner"
                  value="non"
                  className="mr-2"
                  onChange={handleInputChange}
                />
                <span>Non</span>
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-full transition-colors"
        >
          Calculer Mes Aides
        </button>

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
      </form>
    </div>
  );
};