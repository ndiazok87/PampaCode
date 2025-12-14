import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    id: 1,
    name: "Nicolás Díaz",
    role: "Diseñador UI · UX y Frontend",
    description: "Diseño y experiencia de usuario",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    linkedin: "#",
    github: "#",
    email: "nicolas@pampacode.com",
  },
  {
    id: 2,
    name: "Efren Accolto",
    role: "Diseñador UX · UX y Frontend",
    description: "Gestión de proyectos y relación con clientes",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
    linkedin: "#",
    github: "#",
    email: "efren@pampacode.com",
  },
  {
    id: 3,
    name: "Benjamin Sosa",
    role: "Desarrollador backend",
    description: "Infraestructura y Servicios",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
    linkedin: "#",
    github: "#",
    email: "benjamin@pampacode.com",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export function TeamSection() {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
            Nuestro equipo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Talento experto dedicado a construir el futuro digital.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {teamMembers.map((member) => (
            <motion.article
              key={member.id}
              variants={cardVariants}
              className={cn(
                "flex flex-col items-center p-8 rounded-2xl bg-card text-card-foreground",
                "shadow-card-elevated hover:shadow-2xl transition-all duration-300",
                "group"
              )}
            >
              {/* Photo */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img
                  src={member.image}
                  alt={`Foto de ${member.name}`}
                  className="w-48 h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <h3 className="font-heading font-semibold text-lg text-center mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-primary font-medium text-center mb-2">
                {member.role}
              </p>
              <p className="text-sm text-muted-foreground text-center mb-6">
                {member.description}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  aria-label={`LinkedIn de ${member.name}`}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  aria-label={`GitHub de ${member.name}`}
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  aria-label={`Email de ${member.name}`}
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
