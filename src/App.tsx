import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import ThankYou from "@/pages/ThankYou";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";
import { CookieBanner } from "@/components/CookieBanner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/merci" element={<ThankYou />} />
        <Route path="/protection-des-donnees" element={<PrivacyPolicy />} />
      </Routes>
      <CookieBanner />
      <Toaster />
    </Router>
  );
}

export default App;