import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/anim";
import { estate, navItems } from "@/data/estate";
import { Phone } from "lucide-react";
import logo from "@/logo.png";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = overlay.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    document.body.style.overflow = open ? "hidden" : "";

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(el, { pointerEvents: "auto" });
        const tl = gsap.timeline();
        tl.to(el, { opacity: 1, duration: reduced ? 0 : 0.35, ease: "power2.out" });
        if (!reduced) {
          tl.fromTo(
            el.querySelectorAll("[data-nav-item]"),
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.75, ease: "power3.out", stagger: 0.045 },
            "-=0.1",
          ).fromTo(el.querySelectorAll("[data-nav-meta]"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.4");
        }
      } else {
        gsap.to(el, {
          opacity: 0,
          duration: reduced ? 0 : 0.3,
          ease: "power2.in",
          onComplete: () => gsap.set(el, { pointerEvents: "none" }),
        });
      }
    }, el);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [open]);

  // Header background on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        ref={header}
        className={`fixed inset-x-0 z-[90] transition-all duration-700 ease-in-out flex justify-center ${scrolled ? 'top-4 px-4' : 'top-0 px-5 sm:px-8 py-6'}`}
      >
        <div 
          className={`relative flex items-center justify-between transition-all duration-700 ease-in-out w-full ${
            scrolled 
              ? "max-w-[1300px] bg-[#d5cfc0] text-[#2c2a26] rounded-[2.5rem] px-6 sm:px-8 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)]" 
              : "max-w-7xl bg-transparent text-white"
          }`}
        >
          {/* Left: Links (Desktop) & Menu (Mobile) */}
          <div className="flex items-center flex-1">
             {/* Desktop Links */}
             <div className="hidden lg:flex items-center gap-8 text-[11px] font-semibold tracking-[0.15em] uppercase">
                <Link to="/about" className="hover:opacity-60 transition-opacity">About</Link>
                <Link to="/experiences" className="hover:opacity-60 transition-opacity">Experience</Link>
                <Link to="/gallery" className="hover:opacity-60 transition-opacity">Gallery</Link>
             </div>
             {/* Mobile Menu Button */}
             <button
                onClick={() => setOpen(!open)}
                className="lg:hidden flex items-center gap-3 hover:opacity-70 transition-opacity"
             >
                <span className="flex h-3 w-5 flex-col justify-between">
                  <span className={`block h-[1.5px] w-full transition-colors duration-500 ${scrolled ? 'bg-[#2c2a26]' : 'bg-white'}`} />
                  <span className={`block h-[1.5px] w-full transition-colors duration-500 ${scrolled ? 'bg-[#2c2a26]' : 'bg-white'}`} />
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase mt-0.5">Menu</span>
             </button>
          </div>

          {/* Center: Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
            <img 
              src={logo} 
              alt={estate.name} 
              className={`object-contain transition-all duration-700 ease-in-out ${
                scrolled 
                  ? "h-8 sm:h-10 brightness-0 opacity-80" 
                  : "h-10 sm:h-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              }`} 
            />
          </Link>

          {/* Right: Contact & Book Now */}
          <div className="flex items-center justify-end flex-1 gap-4 sm:gap-6">
            <a 
              href={`tel:${estate.phone.replace(/\s/g, "")}`} 
              className={`hidden xl:flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] transition-opacity hover:opacity-60`}
            >
              <Phone size={16} />
              {estate.phone}
            </a>

            <a 
              href={`tel:${estate.phone.replace(/\s/g, "")}`} 
              className={`xl:hidden flex items-center justify-center transition-opacity hover:opacity-60 hidden sm:flex`}
            >
              <Phone size={18} />
            </a>
            
            <a 
              href={`tel:${estate.phone.replace(/\s/g, "")}`} 
              className={`flex items-center justify-center px-6 py-2.5 rounded-full font-bold text-[10px] sm:text-[11px] tracking-[0.15em] uppercase transition-all duration-500 hover:scale-105 ${
                scrolled 
                  ? "bg-[#2f2f2f] text-white hover:bg-[#1a1916] shadow-lg" 
                  : "bg-[#d4b06e] text-[#1c1c1c] border border-transparent hover:shadow-[0_0_20px_rgba(212,176,110,0.4)]"
              }`}
            >
              Book
            </a>
          </div>
        </div>
      </header>

      <div
        ref={overlay}
        id="estate-index"
        hidden={false}
        aria-hidden={!open}
        className="fixed inset-0 z-[85] bg-charcoal opacity-0"
        style={{ pointerEvents: "none" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {navItems.map((item, i) => (
            <img
              key={item.label + i}
              src={item.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              style={{ opacity: hovered === i ? 0.22 : 0 }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/90" />
        </div>

        <nav className="relative flex h-full flex-col justify-start sm:justify-center overflow-y-auto px-5 pb-8 pt-24 sm:px-8" aria-label="Estate index">
          <p data-nav-meta className="label mb-8 hidden sm:block">Index of the house — {estate.established}</p>
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li key={item.label + i} className="overflow-hidden border-b border-ivory/10 last:border-0">
                <div data-nav-item>
                  <Link
                    to={item.to}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    tabIndex={open ? 0 : -1}
                    className="group flex items-baseline gap-4 py-1.5 sm:gap-8 sm:py-3"
                  >
                    <span className="label w-7 shrink-0 text-brass">{item.index}</span>
                    <span className="display text-[1.8rem] leading-none text-ivory/75 transition-all duration-500 group-hover:translate-x-2 group-hover:text-ivory sm:text-[3.4rem] lg:text-[4.2rem]">
                      {item.label}
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div data-nav-meta className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
            <a href={`tel:${estate.phone.replace(/\s/g, "")}`} className="label hover:text-brass">{estate.phone}</a>
            <a href={`mailto:${estate.email}`} className="label hover:text-brass">{estate.email}</a>
          </div>
        </nav>
      </div>
    </>
  );
}
