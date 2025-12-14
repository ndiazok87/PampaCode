import { Mail, Phone, MapPin, Instagram, Linkedin, Github } from "lucide-react";
import logo from "@/assets/pampacode-logo.png";
import { cn } from "@/lib/utils";

interface FooterProps {
  onFAQClick?: () => void;
}

export function Footer({ onFAQClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-primary-foreground pt-16 pb-8 border-t border-primary-foreground/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="PampaCode Logo"
                className="h-10 w-auto object-contain brightness-0 invert opacity-90"
              />
              <span className="font-heading font-bold text-xl tracking-tight">PampaCode</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Transformamos ideas complejas en soluciones digitales robustas y escalables. Tu socio tecnológico estratégico.
            </p>
            <div className="flex items-center gap-4 text-primary-foreground/80">
              {/* Social Links placed here specifically */}
              <a href="#" className="hover:text-primary-foreground hover:scale-110 transition-all p-2 bg-primary-foreground/5 rounded-full">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-primary-foreground hover:scale-110 transition-all p-2 bg-primary-foreground/5 rounded-full">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-primary-foreground hover:scale-110 transition-all p-2 bg-primary-foreground/5 rounded-full">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Explorar</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>
                <a href="#inicio" className="hover:text-primary-foreground hover:translate-x-1 transition-all inline-block">Inicio</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-primary-foreground hover:translate-x-1 transition-all inline-block">Servicios</a>
              </li>
              <li>
                <a href="#equipo" className="hover:text-primary-foreground hover:translate-x-1 transition-all inline-block">Equipo</a>
              </li>
              <li>
                <button
                  onClick={onFAQClick}
                  className="hover:text-primary-foreground hover:translate-x-1 transition-all inline-block text-left"
                >
                  Preguntas Frecuentes
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Servicios</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light"></span>
                Desarrollo a Medida
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light"></span>
                Sistemas de Gestión
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light"></span>
                Web Apps & E-commerce
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light"></span>
                Consultoría IT
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg">Contacto</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li>
                <a href="mailto:pampacode@gmail.com" className="flex items-start gap-3 group">
                  <Mail className="h-5 w-5 mt-0.5 text-primary-light group-hover:text-primary-foreground transition-colors" />
                  <span className="group-hover:text-primary-foreground transition-colors">pampacode@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+5493584222994" className="flex items-start gap-3 group">
                  <Phone className="h-5 w-5 mt-0.5 text-primary-light group-hover:text-primary-foreground transition-colors" />
                  <span className="group-hover:text-primary-foreground transition-colors">+54 9 358-422-2994</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-primary-light" />
                <span>Argentina (Remoto Global)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            © {currentYear} PampaCode Software Development. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-xs text-primary-foreground/50">
            <a href="#" className="hover:text-primary-foreground transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
