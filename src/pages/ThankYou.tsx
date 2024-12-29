import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-page-gradient">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900">
            Merci pour votre demande !
          </h1>
          
          <p className="text-xl text-gray-600">
            Notre équipe va étudier votre dossier et vous recontacter dans les plus brefs délais.
          </p>

          <Card className="p-6 bg-white/50 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Prochaines étapes
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-medium">1</span>
                </div>
                <p className="text-gray-600">
                  Un expert vous contactera sous 24h pour étudier votre projet
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-medium">2</span>
                </div>
                <p className="text-gray-600">
                  Nous réaliserons une étude personnalisée de vos besoins
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-medium">3</span>
                </div>
                <p className="text-gray-600">
                  Nous vous accompagnerons dans toutes les démarches administratives
                </p>
              </div>
            </div>
          </Card>

          <div className="pt-8">
            <a 
              href="/"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            >
              ← Retour à l'accueil
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;