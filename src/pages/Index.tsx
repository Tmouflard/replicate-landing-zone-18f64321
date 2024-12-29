import { HeroSection } from "@/components/landing/HeroSection";
import { BenefitsList } from "@/components/landing/BenefitsList";
import { EligibilityForm } from "@/components/landing/EligibilityForm";
import { ProcessSteps } from "@/components/landing/ProcessSteps";

const Index = () => {
  return (
    <div className="min-h-screen bg-page-gradient p-4 md:p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <HeroSection />
            <div className="hidden md:block">
              <BenefitsList />
            </div>
          </div>
          <div className="lg:sticky lg:top-8">
            <EligibilityForm />
          </div>
        </div>
        <ProcessSteps />
      </div>
    </div>
  );
};

export default Index;