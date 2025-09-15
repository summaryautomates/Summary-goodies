import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "@assets/generated_images/Premium_workspace_hero_image_3797c1a1.png";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onShopNow?: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef1 = useRef<HTMLDivElement>(null);
  const glowRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const background = backgroundRef.current;
    const content = contentRef.current;
    const glow1 = glowRef1.current;
    const glow2 = glowRef2.current;

    if (!hero || !background || !content || !glow1 || !glow2) return;

    // Initial animations
    gsap.set(content, { opacity: 0, y: 50 });
    gsap.set([glow1, glow2], { scale: 0, opacity: 0 });

    // Hero entrance animation
    const tl = gsap.timeline();
    tl.to(content, { 
      opacity: 1, 
      y: 0, 
      duration: 1.5, 
      ease: "power3.out" 
    })
    .to([glow1, glow2], { 
      scale: 1, 
      opacity: 1, 
      duration: 2, 
      ease: "power2.out",
      stagger: 0.3 
    }, "-=1");

    // Parallax scrolling effect
    gsap.to(background, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Content parallax (slower movement)
    gsap.to(content, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: 2
      }
    });

    // Glow effects parallax
    gsap.to(glow1, {
      yPercent: -30,
      xPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });

    gsap.to(glow2, {
      yPercent: -40,
      xPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.8
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">      
      {/* Background with parallax effect */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 26, 0.7), rgba(26, 26, 46, 0.8)), url(${heroImage})`,
          transform: 'translateZ(0)',
        }}
      />
      
      {/* Electric blue glow effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent/10" />
      <div ref={glowRef1} className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div ref={glowRef2} className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/15 rounded-full blur-2xl" />
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-8 h-8 text-accent animate-pulse" data-testid="icon-sparkles" />
          <span className="text-accent font-serif text-lg tracking-wider">Premium Collection</span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Summary <span className="text-accent">Goodies</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Premium workspace essentials crafted for the modern professional. 
          Elevate your productivity with our sophisticated Summary Automates collection.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg font-semibold rounded-lg group"
            onClick={onShopNow}
            data-testid="button-shop-now"
          >
            Shop Collection
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-accent text-accent hover:bg-accent/10 px-8 py-6 text-lg font-semibold rounded-lg backdrop-blur-sm bg-white/5"
            data-testid="button-learn-more"
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 text-gray-400 text-sm">
          <p>Trusted by professionals worldwide</p>
        </div>
      </div>
    </section>
  );
}