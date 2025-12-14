import { useState, useCallback } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
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
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <AppSidebar
        onNavigate={scrollToSection}
        onContactClick={() => setContactModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 lg:ml-0">
        {/* Hero Carousel */}
        <HeroCarousel onFAQClick={() => scrollToSection("faq")} />

        {/* Services Section */}
        <ServicesSection onRequestQuote={handleRequestQuote} />

        {/* Team Section */}
        <TeamSection />

        {/* FAQ Section */}
        <FAQSection onContactClick={() => scrollToSection("inicio")} />

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
