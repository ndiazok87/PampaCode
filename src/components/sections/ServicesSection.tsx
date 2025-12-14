import { motion } from "framer-motion";
import { Briefcase, Wrench, Code } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServicesSectionProps {
  onRequestQuote?: (serviceType: string) => void;
}

const services = [
  {
    id: "gestion",
    icon: Briefcase,
    title: "Sistema de Gestión Empresarial",
    description: "Organice clientes, stock, facturación y reportes. Implementación rápida para PYMEs y cooperativas.",
    buttonText: "Solicitar Presupuesto",
  },
  {
    id: "posventa",
    icon: Wrench,
    title: "Servicio de posventa y mantenimiento",
    description: "Actualizaciones, soporte técnico y monitoreo. Acompañamiento para continuidad operativa.",
    buttonText: "Solicitar Plan de soporte",
  },
  {
    id: "medida",
    icon: Code,
    title: "Desarrollo de software a medida",
    description: "Soluciones personalizadas según objetivos y procesos. Integraciones y escalabilidad desde el inicio.",
    buttonText: "Solicitar Propuesta",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export function ServicesSection({ onRequestQuote }: ServicesSectionProps) {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4 text-center">
            Servicios
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Soluciones tecnológicas diseñadas para escalar tu negocio.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.article
              key={service.id}
              variants={cardVariants}
              className={cn(
                "flex flex-col items-center p-8 rounded-2xl bg-card text-card-foreground",
                "shadow-service hover:shadow-service-hover transition-all duration-300",
                "group"
              )}
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-service-icon text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                <service.icon className="h-8 w-8" />
              </div>

              {/* Title */}
              <h3 className="font-heading font-semibold text-lg text-center mb-4 leading-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed flex-grow">
                {service.description}
              </p>

              {/* Button */}
              <button
                onClick={() => onRequestQuote?.(service.id)}
                className={cn(
                  "w-full py-3 px-6 rounded-lg font-medium text-sm",
                  "bg-service-button text-primary-foreground",
                  "hover:bg-primary-dark transition-all duration-200",
                  "shadow-md hover:shadow-lg"
                )}
              >
                {service.buttonText}
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
