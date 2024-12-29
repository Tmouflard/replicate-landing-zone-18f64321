import { HeroSection } from "@/components/landing/HeroSection";
import { BenefitsList } from "@/components/landing/BenefitsList";
import { EligibilityForm } from "@/components/landing/EligibilityForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-page-gradient p-4 md:p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <HeroSection />
            <BenefitsList />
          </div>
          <EligibilityForm />
        </div>
      </div>
    </div>
  );
};

export default Index;