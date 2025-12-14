import { Mail, Phone, HelpCircle } from "lucide-react";

interface FooterProps {
  onFAQClick?: () => void;
}

export function Footer({ onFAQClick }: FooterProps) {
  return (
    <footer className="bg-primary-dark text-primary-foreground py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <a 
            href="mailto:pampacode@gmail.com" 
            className="flex items-center gap-2 text-sm hover:text-primary-foreground/80 transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>pampacode@gmail.com</span>
          </a>
          <a 
            href="tel:+5493584222994" 
            className="flex items-center gap-2 text-sm hover:text-primary-foreground/80 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>+54 9 358-422-2994</span>
          </a>
        </div>

        {/* FAQ Link */}
        <button 
          onClick={onFAQClick}
          className="flex items-center gap-2 text-sm hover:text-primary-foreground/80 transition-colors"
        >
          <HelpCircle className="h-4 w-4" />
          <span>Preguntas Frecuentes</span>
        </button>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-primary-foreground/20 text-center">
        <p className="text-sm text-primary-foreground/70">
          © {new Date().getFullYear()} PampaCode. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
