import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Mail, Phone, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import heroBg1 from "@/assets/hero-bg-1.jpg";
import heroBg2 from "@/assets/hero-bg-2.jpg";
import heroBg3 from "@/assets/hero-bg-3.jpg";

const slides = [
  {
    id: 1,
    title: "BIENVENIDO A PAMPA CODE !",
    image: heroBg1,
  },
  {
    id: 2,
    title: "APLICACIONES A TU MEDIDA",
    image: heroBg2,
  },
  {
    id: 3,
    title: "POTENCIA TU NEGOCIO CON TECNOLOGÍA",
    image: heroBg3,
  },
];

interface HeroCarouselProps {
  onFAQClick?: () => void;
}

export function HeroCarousel({ onFAQClick }: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="inicio" className="relative w-full h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* Carousel */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="embla__slide relative h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 to-primary/60" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
                <div className="mb-8">
                  {/* Logo */}
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
                    <span className="text-primary-foreground font-heading font-bold text-3xl">&lt;&gt;</span>
                  </div>
                  
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground mb-2">
                    PampaCode
                  </h2>
                  <p className="text-primary-foreground/80 text-sm uppercase tracking-widest">
                    Software Development
                  </p>
                </div>

                <h1 className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl text-primary-foreground max-w-4xl leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/20 transition-all"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/20 transition-all"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              selectedIndex === index
                ? "w-8 bg-primary-foreground"
                : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
            )}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Footer Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-primary-dark/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-3 text-sm text-primary-foreground/90">
          <div className="flex items-center gap-6">
            <a href="mailto:pampacode@gmail.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">pampacode@gmail.com</span>
            </a>
            <a href="tel:+5493584222994" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">+54 9 358-422-2994</span>
            </a>
          </div>
          <button 
            onClick={onFAQClick}
            className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Preguntas Frecuentes</span>
          </button>
        </div>
      </div>
    </section>
  );
}
