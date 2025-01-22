import { ScrollArea } from "@/components/ui/scroll-area";

export const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <ScrollArea className="h-[calc(100vh-200px)] rounded-md">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold mb-8">Politique de Protection des Données</h1>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p>
              Cette politique de protection des données personnelles décrit comment nous collectons, utilisons et protégeons vos informations personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et au Digital Markets Act (DMA).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Collecte des données</h2>
            <p>Nous collectons les informations suivantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Code postal</li>
              <li>Informations sur votre logement et situation énergétique</li>
              <li>Revenus du foyer</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Utilisation des données</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Évaluer votre éligibilité aux aides à la rénovation énergétique</li>
              <li>Vous contacter concernant votre demande</li>
              <li>Transmettre votre dossier aux partenaires qualifiés</li>
              <li>Améliorer nos services et votre expérience utilisateur</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Base légale du traitement</h2>
            <p>Le traitement de vos données personnelles est basé sur :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Votre consentement explicite</li>
              <li>L'exécution du contrat de service</li>
              <li>Nos obligations légales</li>
              <li>Notre intérêt légitime à développer et améliorer nos services</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Durée de conservation</h2>
            <p>
              Vos données personnelles sont conservées pendant une durée de 3 ans à compter de notre dernier contact, sauf obligation légale de conservation plus longue.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l'effacement (droit à l'oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droit de retirer votre consentement à tout moment</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Partage des données</h2>
            <p>
              Vos données peuvent être partagées avec :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nos partenaires qualifiés pour le traitement de votre dossier</li>
              <li>Nos sous-traitants techniques (hébergement, maintenance)</li>
              <li>Les autorités compétentes sur demande</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Cookies et traceurs</h2>
            <p>
              Notre site utilise des cookies et autres traceurs pour améliorer votre expérience de navigation et analyser le trafic. Vous pouvez paramétrer vos préférences via notre bandeau de cookies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">10. Démarchage téléphonique</h2>
            <p>
              Conformément à l'article L.223-2 du Code de la consommation, vous disposez du droit de vous inscrire gratuitement sur la liste d'opposition au démarchage téléphonique Bloctel sur le site <a href="https://www.bloctel.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.bloctel.gouv.fr</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">11. Contact</h2>
            <p>
              Pour toute question concernant cette politique ou pour exercer vos droits, vous pouvez nous contacter à l'adresse : dpo@france-action-ecologie.com
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">12. Mise à jour</h2>
            <p>
              Cette politique de protection des données peut être mise à jour périodiquement. La dernière mise à jour date du 8 mars 2024.
            </p>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PrivacyPolicy;