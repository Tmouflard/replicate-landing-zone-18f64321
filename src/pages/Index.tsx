import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-page-gradient p-4 md:p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-lg">
              <span className="font-bold">4,9/5</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
              <span className="text-gray-600">sur 3 261 avis</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              L'État finance votre{" "}
              <span className="bg-primary text-white px-2">Pompe à Chaleur</span>
              <br />
              jusqu'à{" "}
              <span className="bg-accent text-white px-2">10 500 €</span>
            </h1>

            <p className="text-xl text-gray-700">
              Ne laissez pas l'hiver vous surprendre. Agissez dès aujourd'hui
              pour un confort optimal et des économies durables.
            </p>

            <div className="space-y-4">
              {[
                "Installation par des professionnels agréés RGE",
                "Jusqu'à 30% d'économies sur votre facture",
                "Gagnez votre indépendance énergétique !",
                "Accompagnement et expertise tout au long de la procédure",
              ].map((text, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-lg">{text}</span>
                </div>
              ))}
            </div>

            <img
              src="/lovable-uploads/bb9b99c3-6d49-441f-b74e-fee12461c6c0.png"
              alt="Professional"
              className="max-w-sm ml-auto"
            />
          </div>

          {/* Right Column - Form */}
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
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nom et Prénom"
                  className="w-full p-3 border rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="postal"
                  placeholder="Code Postal"
                  className="w-full p-3 border rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Téléphone"
                  className="w-full p-3 border rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <select
                  name="heatingType"
                  className="w-full p-3 border rounded-lg text-gray-600"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Type de chauffage *</option>
                  <option value="fioul">Fioul</option>
                  <option value="gaz">Gaz</option>
                  <option value="electrique">Électrique</option>
                </select>
              </div>

              <div>
                <select
                  name="income"
                  className="w-full p-3 border rounded-lg text-gray-600"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Quel est votre revenu fiscal ? *</option>
                  <option value="0-15250">0 € - 15 250 €</option>
                  <option value="15251-30000">15 251 € - 30 000 €</option>
                  <option value="30001+">Plus de 30 000 €</option>
                </select>
              </div>

              <div>
                <p className="mb-2 text-gray-700">Nombre de personnes dans votre foyer *</p>
                <div className="grid grid-cols-3 gap-4">
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
                <p className="mb-2 text-gray-700">Êtes vous propriétaire de la maison? *</p>
                <div className="flex gap-4">
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

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 px-8 rounded-full transition-colors"
              >
                Calculer Mes Aides
              </button>

              <p className="text-xs text-gray-500 mt-4">
                COOKIES CONSENT : En soumettant cette demande, vous acceptez d'être contacté par téléphone et de
                recevoir des emails de la part des partenaires pour le suivi de votre demande et la mission commerciale qui
                peut en découler. Vous disposez du droit de vous inscrire sur la liste d'opposition au démarchage
                téléphonique Bloctel ici. Pour en savoir plus sur la gestion de vos données personnelles et exercer vos
                droits, consultez notre{" "}
                <a href="#" className="text-primary underline">
                  politique de confidentialité des données
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;