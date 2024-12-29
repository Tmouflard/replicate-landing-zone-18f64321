import { HeroSection } from "@/components/landing/HeroSection";
import { BenefitsList } from "@/components/landing/BenefitsList";
import { EligibilityForm } from "@/components/landing/EligibilityForm";
import { ProcessSteps } from "@/components/landing/ProcessSteps";
import { BenefitsSection } from "@/components/landing/BenefitsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-page-gradient">
      <div className="container mx-auto min-h-screen flex items-start pt-8 lg:pt-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
          <div className="space-y-8">
            <HeroSection />
            <div className="hidden md:block">
              <BenefitsList />
            </div>
          </div>
          <div className="lg:sticky lg:top-8">
            <EligibilityForm />
          </div>
        </div>
      </div>

      <div className="mt-screen pt-24">
        <BenefitsSection />
        <ProcessSteps />
      </div>
    </div>
  );
};

export default Index;