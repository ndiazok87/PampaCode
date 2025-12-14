import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FAQSectionProps {
  onContactClick?: () => void;
}

const faqs = [
  {
    id: "1",
    question: "¿Cuánto demora un sistema de gestión administrativa típico?",
    answer: "Según el alcance, entre 2 y 8 semanas para una primera versión funcional. Ajustamos plazos en la propuesta según módulos y complejidad.",
  },
  {
    id: "2",
    question: "¿Qué incluye el servicio de posventa y mantenimiento?",
    answer: "Incluye actualizaciones de seguridad, corrección de errores, soporte técnico por email y teléfono, monitoreo del sistema y capacitación continua para tu equipo.",
  },
  {
    id: "3",
    question: "¿Cómo solicito un presupuesto?",
    answer: "Completá el formulario de 'Solicitud de presupuesto' con objetivos, funcionalidades y plazos. Te lo enviamos por email a la brevedad.",
  },
  {
    id: "4",
    question: "¿Pueden integrarse con sistemas existentes (AFIP, ERP, pagos)?",
    answer: "Sí, desarrollamos integraciones con AFIP, Mercado Pago, sistemas contables, ERPs y cualquier API que tu negocio necesite conectar.",
  },
  {
    id: "5",
    question: "¿Cuáles son las condiciones comerciales?",
    answer: "Trabajamos con un anticipo del 50% al iniciar y el resto al entregar. Para proyectos grandes, ofrecemos planes de pago en cuotas.",
  },
];

export function FAQSection({ onContactClick }: FAQSectionProps) {
  return (
    <section id="faq" className="py-20 px-6 bg-primary">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground mb-2">
            Preguntas frecuentes (FAQ)
          </h2>
          <p className="text-primary-foreground/80 text-sm">
            Ahorra fricción: encontrá respuestas rápidas. Si algo no está aquí, podés escribirnos.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card rounded-2xl shadow-card-elevated overflow-hidden"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b border-border last:border-b-0">
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-card-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="px-6 py-6 bg-muted/50 border-t border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-medium text-card-foreground">
                  ¿No encontrás tu respuesta? Escribínos.
                </p>
                <p className="text-sm text-muted-foreground">
                  Podés completar el formulario de contacto o solicitar un presupuesto detallado.
                </p>
              </div>
              <button
                onClick={onContactClick}
                className={cn(
                  "px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap",
                  "bg-primary text-primary-foreground",
                  "hover:bg-primary-dark transition-all duration-200",
                  "shadow-md hover:shadow-lg"
                )}
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
