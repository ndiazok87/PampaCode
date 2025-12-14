import { Home, Settings, Users, MessageSquare, Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AppSidebarProps {
  onNavigate?: (section: string) => void;
  onContactClick?: () => void;
}

const menuItems = [
  { title: "Inicio", href: "#inicio", icon: Home },
  { title: "Servicios", href: "#servicios", icon: Settings },
  { title: "Nuestro equipo", href: "#equipo", icon: Users },
];

export function AppSidebar({ onNavigate, onContactClick }: AppSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (section: string) => {
    onNavigate?.(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-sidebar text-sidebar-foreground shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-72 bg-sidebar text-sidebar-foreground",
          "flex flex-col shadow-2xl",
          "transition-transform duration-300 ease-out",
          "lg:translate-x-0 lg:static lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sidebar-primary">
            <span className="text-sidebar-primary-foreground font-heading font-bold text-lg">&lt;&gt;</span>
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg text-sidebar-foreground">PampaCode</h1>
            <p className="text-xs text-sidebar-foreground/70">Software Development</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href.replace('#', ''));
              }}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg",
                "text-sidebar-foreground/80 hover:text-sidebar-foreground",
                "hover:bg-sidebar-accent transition-all duration-200",
                "group cursor-pointer"
              )}
            >
              <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">{item.title}</span>
            </a>
          ))}
        </nav>

        {/* Contact Button */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => {
              onContactClick?.();
              setIsOpen(false);
            }}
            className={cn(
              "flex items-center gap-3 w-full px-4 py-3 rounded-lg",
              "bg-sidebar-primary text-sidebar-primary-foreground",
              "hover:bg-sidebar-primary/90 transition-all duration-200",
              "font-medium shadow-lg hover:shadow-xl"
            )}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Contactar al equipo</span>
          </button>
        </div>
      </aside>
    </>
  );
}
