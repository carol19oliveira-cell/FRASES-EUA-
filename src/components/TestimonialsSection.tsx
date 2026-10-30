import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X, ArrowDown } from "lucide-react";

export interface TestimonialPrint {
  id: string;
  imageUrl: string;
  fallbackUrl?: string;
  label: string;
  alt: string;
}

const DEFAULT_PRINTS: TestimonialPrint[] = [
  {
    id: "print-en-1",
    imageUrl: "/images/depoimentos/depoimento-en-1.png",
    fallbackUrl: "https://i.ibb.co/ZQdpG2R/DEPO-LEVARIA-ANOS.png",
    label: "Student Review",
    alt: "Student testimonial praising the Bass Lick Library"
  },
  {
    id: "print-en-2",
    imageUrl: "/images/depoimentos/depoimento-en-2.png",
    fallbackUrl: "https://i.ibb.co/zhvq72K8/DEPOIMENTO-MAN-O-INGLES.png",
    label: "Student Review",
    alt: "Bass player feedback on musical phrasing and lines"
  },
  {
    id: "print-en-3",
    imageUrl: "/images/depoimentos/depoimento-en-3.png",
    fallbackUrl: "https://i.ibb.co/1tx7PG5w/Chat-GPT-Image-27-de-ago-de-2026-16-46-02.png",
    label: "Student Review",
    alt: "Bassist review on groove and backing tracks"
  },
  {
    id: "print-en-4",
    imageUrl: "/images/depoimentos/depoimento-en-4.png",
    fallbackUrl: "https://i.ibb.co/4gRyVfSf/Chat-GPT-Image-27-de-ago-de-2026-16-49-09.png",
    label: "Student Review",
    alt: "Student praise for the Bass Lick Library progress"
  }
];

interface TestimonialsSectionProps {
  prints?: TestimonialPrint[];
}

export default function TestimonialsSection({ prints = DEFAULT_PRINTS }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<{ url: string; alt?: string } | null>(null);
  const [fallbackUrls, setFallbackUrls] = useState<Record<string, string>>({});
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const pauseTimeoutRef = useRef<number | null>(null);
  const hasInitializedScrollRef = useRef(false);
  const scrollPositionRef = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileHeight, setMobileHeight] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(1);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const mouseStartXRef = useRef<number | null>(null);

  const getImageSrc = (item: TestimonialPrint) => {
    return fallbackUrls[item.id] || item.imageUrl;
  };

  const handleImageError = (item: TestimonialPrint) => {
    if (item.fallbackUrl && fallbackUrls[item.id] !== item.fallbackUrl) {
      setFallbackUrls((prev) => ({ ...prev, [item.id]: item.fallbackUrl! }));
    }
  };

  // Preload prints
  useEffect(() => {
    prints.forEach((print) => {
      const img = new Image();
      img.src = getImageSrc(print);
    });
  }, [prints]);

  // Infinite scroll repeated array
  const repeatedPrints = [...prints, ...prints, ...prints];

  const initScrollPosition = () => {
    const el = scrollContainerRef.current;
    if (!el || hasInitializedScrollRef.current) return;
    const third = el.scrollWidth / 3;
    if (third > 200) {
      el.scrollLeft = third;
      scrollPositionRef.current = third;
      hasInitializedScrollRef.current = true;
    }
  };

  useEffect(() => {
    initScrollPosition();
    const timer = setTimeout(initScrollPosition, 300);
    return () => clearTimeout(timer);
  }, [prints]);

  // Intersection observer to pause auto scroll when outside viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Check immediate visibility
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setHasBeenVisible(true);
      setIsVisible(true);
      initScrollPosition();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasBeenVisible(true);
            setIsVisible(true);
            initScrollPosition();
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Update height on mobile slide changes
  const updateMobileHeight = () => {
    if (slideRef.current) {
      const h = slideRef.current.offsetHeight;
      if (h > 20) setMobileHeight(h);
    }
  };

  useEffect(() => {
    updateMobileHeight();
    const t = setTimeout(updateMobileHeight, 60);
    if (slideRef.current && typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => updateMobileHeight());
      ro.observe(slideRef.current);
      return () => {
        clearTimeout(t);
        ro.disconnect();
      };
    }
    return () => clearTimeout(t);
  }, [currentIndex, fallbackUrls]);

  // Pause helper
  const pauseTemporarily = (duration = 4500) => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      window.clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = window.setTimeout(() => {
      const container = scrollContainerRef.current;
      if (container) {
        scrollPositionRef.current = container.scrollLeft;
      }
      setIsPaused(false);
      pauseTimeoutRef.current = null;
    }, duration);
  };

  // Next and Prev handlers
  const handleNextMobile = () => {
    pauseTemporarily(4500);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % prints.length);
  };

  const handlePrevMobile = () => {
    pauseTemporarily(4500);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + prints.length) % prints.length);
  };

  // Touch swipe support on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    pauseTemporarily(5000);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;
    if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY) * 1.2) {
      if (diffX < 0) {
        handleNextMobile();
      } else {
        handlePrevMobile();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Mouse drag support on mobile container
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartXRef.current = e.clientX;
    pauseTemporarily(5000);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseStartXRef.current !== null) {
      const diffX = e.clientX - mouseStartXRef.current;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          handleNextMobile();
        } else {
          handlePrevMobile();
        }
      }
      mouseStartXRef.current = null;
    }
  };

  // Animation Loop / Timers
  useEffect(() => {
    if (!hasBeenVisible || !isVisible || isPaused) return;

    if (window.innerWidth >= 768) {
      const container = scrollContainerRef.current;
      if (!container) return;
      scrollPositionRef.current = container.scrollLeft;
      let animationId: number;
      let lastTime = performance.now();
      const speed = 24; // px per second

      const step = (time: number) => {
        const delta = Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;
        const currentContainer = scrollContainerRef.current;
        if (currentContainer) {
          scrollPositionRef.current += speed * delta;
          const oneSetWidth = currentContainer.scrollWidth / 3;
          if (oneSetWidth > 0) {
            if (scrollPositionRef.current >= oneSetWidth * 2) {
              scrollPositionRef.current -= oneSetWidth;
            } else if (scrollPositionRef.current <= oneSetWidth * 0.15) {
              scrollPositionRef.current += oneSetWidth;
            }
          }
          currentContainer.scrollLeft = scrollPositionRef.current;
        }
        animationId = requestAnimationFrame(step);
      };

      animationId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animationId);
    } else {
      // Mobile auto-slide every 5s
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % prints.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [hasBeenVisible, isVisible, isPaused, prints.length]);

  // Desktop smooth manual navigation
  const handleNextDesktop = () => {
    pauseTemporarily(3500);
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = Math.min(container.clientWidth * 0.85, 360);
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(() => {
      if (container) {
        scrollPositionRef.current = container.scrollLeft;
        const oneSetWidth = container.scrollWidth / 3;
        if (oneSetWidth > 0 && container.scrollLeft >= oneSetWidth * 2) {
          container.scrollLeft -= oneSetWidth;
          scrollPositionRef.current = container.scrollLeft;
        }
      }
    }, 350);
  };

  const handlePrevDesktop = () => {
    pauseTemporarily(3500);
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = Math.min(container.clientWidth * 0.85, 360);
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    setTimeout(() => {
      if (container) {
        scrollPositionRef.current = container.scrollLeft;
        const oneSetWidth = container.scrollWidth / 3;
        if (oneSetWidth > 0 && container.scrollLeft <= oneSetWidth * 0.25) {
          container.scrollLeft += oneSetWidth;
          scrollPositionRef.current = container.scrollLeft;
        }
      }
    }, 350);
  };

  const handlePrevResponsive = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      handlePrevMobile();
    } else {
      handlePrevDesktop();
    }
  };

  const handleNextResponsive = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      handleNextMobile();
    } else {
      handleNextDesktop();
    }
  };

  const currentPrint = prints[currentIndex] || prints[0];

  return (
    <section
      ref={sectionRef}
      className="pt-6 pb-4 md:pt-11 md:pb-6 relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#090d20] via-[#111938] to-[#090d20] border-y border-brand-orange/20 shadow-[inset_0_1px_0_rgba(249,115,22,0.15),inset_0_-1px_0_rgba(249,115,22,0.15)]"
    >
      {/* Decorative gradient glow lines and halos */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] max-w-full h-[260px] bg-gradient-to-b from-brand-orange/20 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-indigo-600/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[160px] bg-brand-orange/10 blur-2xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(249,115,22,0.15)_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col">
        <div className="text-center max-w-4xl mx-auto space-y-1.5 md:space-y-2">
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-white uppercase italic tracking-tight leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            BASS PLAYERS WHO JOINED, RECOMMEND IT.
          </h3>
          <p className="text-sm sm:text-base md:text-xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-300 to-brand-amber">
            SEE WHAT BASS PLAYERS ARE SAYING
          </p>
        </div>
      </div>

      {/* Mobile Carousel (< 768px) */}
      <div className="block md:hidden relative w-full mt-4 select-none px-3">
        <div
          className="relative w-full max-w-[340px] xs:max-w-[360px] mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* Mobile Prev Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevMobile();
            }}
            aria-label="Previous testimonial"
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/85 hover:bg-brand-orange border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-xl transition-all active:scale-90 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Mobile Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextMobile();
            }}
            aria-label="Next testimonial"
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/85 hover:bg-brand-orange border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-xl transition-all active:scale-90 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <motion.div
            className="overflow-hidden w-full transition-[height] duration-300 ease-out"
            animate={{ height: mobileHeight || "auto" }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                ref={slideRef}
                custom={direction}
                initial={{ opacity: 0, x: direction * 35 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -35 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="w-full flex items-center justify-center cursor-zoom-in"
                onClick={() =>
                  setSelectedImage({
                    url: getImageSrc(currentPrint),
                    alt: currentPrint.alt
                  })
                }
              >
                <img
                  src={getImageSrc(currentPrint)}
                  alt={currentPrint.alt || "Student testimonial review"}
                  onError={() => handleImageError(currentPrint)}
                  onLoad={updateMobileHeight}
                  className="w-full h-auto block rounded-xl shadow-lg shadow-black/50 object-contain"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Desktop Continuous Infinite Scroll (>= 768px) */}
      <div className="hidden md:block relative w-full overflow-hidden mt-5 md:mt-6 select-none group">
        {/* Left & Right gradient fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#111938] via-[#111938]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#111938] via-[#111938]/80 to-transparent z-10" />

        {/* Desktop Left Button */}
        <button
          type="button"
          onClick={handlePrevDesktop}
          aria-label="Previous testimonial"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-brand-orange border border-white/20 hover:border-brand-orange text-white flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Desktop Right Button */}
        <button
          type="button"
          onClick={handleNextDesktop}
          aria-label="Next testimonial"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 hover:bg-brand-orange border border-white/20 hover:border-brand-orange text-white flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Scroll track */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-none flex items-start gap-4 md:gap-5 py-2 px-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (pauseTimeoutRef.current) {
              window.clearTimeout(pauseTimeoutRef.current);
              pauseTimeoutRef.current = null;
            }
            if (scrollContainerRef.current) {
              scrollPositionRef.current = scrollContainerRef.current.scrollLeft;
            }
            setIsPaused(false);
          }}
          onMouseDown={() => pauseTemporarily(3500)}
          onScroll={() => {
            if (isPaused && scrollContainerRef.current) {
              scrollPositionRef.current = scrollContainerRef.current.scrollLeft;
            }
          }}
        >
          {repeatedPrints.map((print, index) => (
            <div
              key={`${print.id}-${index}`}
              className="w-[320px] md:w-[360px] lg:w-[390px] shrink-0 cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
              onClick={() =>
                setSelectedImage({
                  url: getImageSrc(print),
                  alt: print.alt
                })
              }
            >
              <img
                src={getImageSrc(print)}
                alt={print.alt || "Student testimonial review"}
                onError={() => handleImageError(print)}
                onLoad={initScrollPosition}
                className="w-full h-auto block rounded-xl shadow-lg shadow-black/40"
                loading="eager"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Navigation Bar */}
      <div className="flex items-center justify-center gap-3 mt-3 sm:mt-3 px-3">
        <button
          type="button"
          onClick={handlePrevResponsive}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.06] hover:bg-brand-orange text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white border border-white/10 hover:border-brand-orange transition-all duration-200 active:scale-95 cursor-pointer"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400 select-none">
            Swipe or use arrows
          </span>
          <div className="flex md:hidden items-center gap-1.5 mt-1">
            {prints.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  pauseTemporarily(5000);
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? "w-4 bg-brand-orange" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleNextResponsive}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.06] hover:bg-brand-orange text-[11px] sm:text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white border border-white/10 hover:border-brand-orange transition-all duration-200 active:scale-95 cursor-pointer"
          aria-label="Next testimonial"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col">
        <div className="mt-3 md:mt-4 text-center">
          <div className="inline-flex flex-col items-center gap-1.5 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 w-full">
              <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              <div className="h-[1px] flex-1 max-w-[80px] bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-display font-extrabold uppercase italic tracking-tight text-white drop-shadow-[0_2px_12px_rgba(249,115,22,0.25)]">
              Now it's your turn
            </p>
            <a
              href="#cta-section"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-mono uppercase tracking-wider text-brand-orange hover:text-brand-amber transition-colors group cursor-pointer"
            >
              <span>Claim Special Offer</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Modal Zoom Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 md:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <div
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 text-slate-300 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close enlarged image"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedImage.url}
                alt={selectedImage.alt || "Enlarged student testimonial"}
                className="max-h-[85vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
              <p className="mt-3 text-xs font-mono text-slate-400">
                Tap outside or click X to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
