import { Link } from "@tanstack/react-router";
import { estate, navItems } from "@/data/estate";
import logo from "@/logo.png";

export function Footer() {
  return (
    <footer className="relative bg-[#0d0d0d] pt-32 pb-10 sm:pb-12 mt-24">
      {/* SVG Wave Separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-[99%]">
        <svg 
          className="relative block w-full h-[50px] sm:h-[80px] lg:h-[120px]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,60 C480,120 960,0 1440,60 L1440,120 L0,120 Z" 
            className="fill-[#0d0d0d]"
          ></path>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col items-start">
            <img src={logo} alt={estate.name} className="h-16 w-auto object-contain rounded mb-6" />
            <p className="text-sm font-semibold tracking-wider text-[#d4b06e] mb-2">{estate.descriptor}</p>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">{estate.location}</p>
            <a 
              href={`tel:${estate.phone.replace(/\s/g, "")}`} 
              className="mt-8 inline-flex items-center justify-center gap-2 bg-[#d4b06e] text-[#1c1c1c] px-6 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all hover:scale-105"
            >
              Call Us
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="label mb-6 text-[#d4b06e]">Explore</p>
            <ul className="space-y-3">
              {navItems.slice(0, 6).map((item) => (
                <li key={item.index}>
                  <Link to={item.to} className="text-sm text-gray-400 transition-colors hover:text-[#d4b06e] flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#d4b06e]/50"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label mb-6 text-[#d4b06e]">Reach Us</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href={`tel:${estate.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-[#d4b06e]">{estate.phone}</a></li>
              <li><a href={`mailto:${estate.email}`} className="transition-colors hover:text-[#d4b06e]">{estate.email}</a></li>
            </ul>
            <p className="label mb-4 mt-10 text-[#d4b06e]">Elsewhere</p>
            <ul className="flex flex-wrap gap-3">
              {estate.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-xs text-gray-400 border border-gray-700 rounded-full px-4 py-1.5 transition-all hover:text-[#1c1c1c] hover:bg-[#d4b06e] hover:border-[#d4b06e]">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} {estate.name}. All rights reserved.</p>
          <p className="text-center sm:text-right">Premium Banquet Hall & Deluxe Rooms — Gorakhpur, India</p>
        </div>
      </div>
    </footer>
  );
}
