import { useState, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/sections/Footer";
import { ContactModal } from "@/components/modals/ContactModal";
import { QuoteModal } from "@/components/modals/QuoteModal";
import { SuccessModal } from "@/components/modals/SuccessModal";

const Index = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<string>("");

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleRequestQuote = useCallback((serviceType: string) => {
    setSelectedServiceType(serviceType);
    setQuoteModalOpen(true);
  }, []);

  const handleFormSuccess = useCallback(() => {
    setSuccessModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* Navbar */}
      <Navbar
        onNavigate={scrollToSection}
        onContactClick={() => setContactModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Sections Wrapper with overflow control */}
        <div className="w-full overflow-x-hidden">
          {/* Hero Carousel */}
          <div id="inicio" className="scroll-mt-24">
            <HeroCarousel onFAQClick={() => scrollToSection("faq")} />
          </div>

          {/* Services Section */}
          <div id="servicios" className="scroll-mt-24">
            <ServicesSection onRequestQuote={handleRequestQuote} />
          </div>

          {/* Team Section */}
          <div id="equipo" className="scroll-mt-24">
            <TeamSection />
          </div>

          {/* FAQ Section */}
          <div id="faq" className="scroll-mt-24">
            <FAQSection onContactClick={() => scrollToSection("inicio")} />
          </div>
        </div>

        {/* Footer */}
        <Footer onFAQClick={() => scrollToSection("faq")} />
      </main>

      {/* Modals */}
      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        onSuccess={handleFormSuccess}
      />
      <QuoteModal
        open={quoteModalOpen}
        onOpenChange={setQuoteModalOpen}
        serviceType={selectedServiceType}
        onSuccess={handleFormSuccess}
      />
      <SuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
      />
    </div>
  );
};

export default Index;
