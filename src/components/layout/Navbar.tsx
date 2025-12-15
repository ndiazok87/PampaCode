import { useState, useEffect } from "react";
import { Menu, MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/pampacode-logo.png";

interface NavbarProps {
    onNavigate?: (section: string) => void;
    onContactClick?: () => void;
}

const menuItems = [
    { title: "Inicio", href: "#inicio" },
    { title: "Servicios", href: "#servicios" },
    { title: "Nuestro equipo", href: "#equipo" },
    { title: "FAQ", href: "#faq" },
];

export function Navbar({ onNavigate, onContactClick }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);

            // Update active section based on scroll position
            const sections = menuItems.map(item => item.href.substring(1));

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 300) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        const section = href.replace("#", "");
        onNavigate?.(section);
        setIsOpen(false);
    };

    return (
        <header
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 border-b",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md border-border shadow-sm"
                    : "bg-transparent border-transparent"
            )}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleNavClick("inicio")}
                >
                    <img
                        src={logo}
                        alt="PampaCode"
                        className={cn(
                            "h-10 w-auto object-contain transition-all duration-300",
                            isScrolled
                                ? "brightness-0 dark:brightness-0 dark:invert" // Light mode: Black. Dark mode: White.
                                : "" // Hero mode (Transparent on Blue): Keep White (Native).
                        )}
                    />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-6">
                    {menuItems.map((item) => (
                        <a
                            key={item.title}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.href);
                            }}
                            className={cn(
                                "text-sm font-medium transition-all duration-200 relative py-1 hover:scale-105",
                                isScrolled
                                    ? "text-slate-600 dark:text-white"
                                    : "text-white/90 hover:text-white",
                                activeSection === item.href.substring(1)
                                    ? "text-primary dark:text-white font-bold"
                                    : "hover:text-primary dark:hover:text-primary-light"
                            )}
                        >
                            {item.title}
                            {activeSection === item.href.substring(1) && (
                                <span className={cn(
                                    "absolute bottom-0 left-0 w-full h-0.5 rounded-full",
                                    isScrolled ? "bg-primary" : "bg-white"
                                )} />
                            )}
                        </a>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-3">
                    <ModeToggle />
                    <Button
                        onClick={onContactClick}
                        variant="default"
                        className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-primary/50 active:scale-95"
                    >
                        <MessageSquare className="h-4 w-4" />
                        <span>Contactar</span>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className="flex lg:hidden items-center gap-2">
                    <ModeToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="shrink-0">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Menú</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[80vw] sm:w-[350px] p-0 border-l border-border/40">
                            <SheetHeader className="p-6 border-b border-border/40 text-left">
                                <SheetTitle className="flex items-center gap-2">
                                    <img
                                        src={logo}
                                        alt="PampaCode"
                                        className="h-8 w-auto object-contain brightness-0 dark:invert"
                                    />
                                    <span className="font-heading font-bold">PampaCode</span>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col h-full py-6 px-4">
                                <nav className="flex flex-col gap-2">
                                    {menuItems.map((item) => (
                                        <a
                                            key={item.title}
                                            href={item.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavClick(item.href);
                                            }}
                                            className={cn(
                                                "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                                activeSection === item.href.substring(1)
                                                    ? "bg-primary/10 text-primary"
                                                    : "hover:bg-accent text-foreground/80"
                                            )}
                                        >
                                            {item.title}
                                        </a>
                                    ))}
                                </nav>
                                <div className="mt-8 px-4">
                                    <Button onClick={() => {
                                        setIsOpen(false);
                                        onContactClick?.();
                                    }} className="w-full gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>Contactar Equipo</span>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
