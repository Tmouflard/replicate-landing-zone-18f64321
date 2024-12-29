import { HeroSection } from "@/components/landing/HeroSection";
import { BenefitsList } from "@/components/landing/BenefitsList";
import { EligibilityForm } from "@/components/landing/EligibilityForm";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-page-gradient">
      <Header />
      <div className="container mx-auto min-h-screen flex items-start pt-24 lg:pt-32 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full">
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-12">
              <HeroSection />
            </div>
            <div className="hidden md:block mt-auto">
              <BenefitsList />
            </div>
          </div>
          <div className="lg:sticky lg:top-24">
            <EligibilityForm />
          </div>
        </div>
      </div>

      <div className="mt-screen pt-24">
        <BenefitsSection />
        <ProcessSteps />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;