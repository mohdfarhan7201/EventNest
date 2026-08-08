"use client";

import React, { useMemo, useState } from "react";
import Tilt from "react-parallax-tilt";
import {
  TrainFront,
  Plane,
  HeartPulse,
  GraduationCap,
  Waves,
  Landmark,
  ShoppingBag,
  Building2,
} from "lucide-react";

const locations = [
  { id: 1, name: "Mahayogi Gorakhnath Airport", time: "20 MIN", subtitle: "Direct connectivity to the city", label: "AIRPORT - 20M", angle: 12, radius: 38, icon: Plane },
  { id: 2, name: "Gorakhpur Railway Station", time: "15 MIN", subtitle: "Conveniently close by", label: "RLY STATION - 15M", angle: 190, radius: 35, icon: TrainFront },
  { id: 3, name: "Gorakhnath Temple", time: "25 MIN", subtitle: "The spiritual and vibrant heart", label: "GORAKHNATH TEMPLE - 25M", angle: -75, radius: 42, icon: Landmark },
  { id: 4, name: "City Mall", time: "10 MIN", subtitle: "A premier shopping destination", label: "CITY MALL - 10M", angle: 145, radius: 22, icon: ShoppingBag },
  { id: 5, name: "Nouka Vihar", time: "15 MIN", subtitle: "Sports & entertainment hub", label: "NOUKA VIHAR - 15M", angle: 105, radius: 36, icon: Waves },
  { id: 6, name: "AIIMS Gorakhpur", time: "05 MIN", subtitle: "World-class medical care", label: "AIIMS - 05M", angle: -28, radius: 25, icon: HeartPulse },
  { id: 7, name: "MMMUT", time: "10 MIN", subtitle: "Premier educational institute", label: "MMMUT - 10M", angle: 55, radius: 30, icon: GraduationCap },
  { id: 8, name: "Golghar", time: "20 MIN", subtitle: "Gorakhpur's bustling upscale district", label: "GOLGHAR - 20M", angle: 235, radius: 30, icon: Building2 },
];

const getPos = (angle: number, radius: number) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
  };
};

export function NearbyLocations() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const points = useMemo(() => {
    return locations.map((loc) => ({
      ...loc,
      pos: getPos(loc.angle, loc.radius),
    }));
  }, []);

  return (
    <section className="w-full py-24 md:py-32 bg-[#1b1b1b] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Radar Map + Google Maps Button */}
        <div className="flex flex-col items-center">
          <Tilt
            tiltMaxAngleX={6}
            tiltMaxAngleY={6}
            glareEnable={true}
            glareMaxOpacity={0.12}
            glareColor="#c5a880"
            glarePosition="all"
            scale={1.01}
            transitionSpeed={2000}
            className="relative w-full max-w-[500px] aspect-square rounded-[2.5rem] overflow-hidden"
            style={{
              backgroundColor: "#111111",
              boxShadow: "0 20px 60px -15px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(197, 168, 128, 0.2), inset 0 0 30px rgba(197, 168, 128, 0.05)",
            }}
          >
            {/* Background Subtle Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]" 
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                backgroundSize: "30px 30px"
              }} 
            />
            
            {/* SVG Drawing Layer for the "Spider Net" */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              {/* Background Solid Axes */}
              <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.15">
                <line x1="50" y1="0" x2="50" y2="100" />
                <line x1="0" y1="50" x2="100" y2="50" />
                <line x1="0" y1="0" x2="100" y2="100" />
                <line x1="100" y1="0" x2="0" y2="100" />
              </g>

              {/* Concentric Dashed Circles */}
              <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.2" strokeDasharray="1,1">
                <circle cx="50" cy="50" r="15" />
                <circle cx="50" cy="50" r="28" />
                <circle cx="50" cy="50" r="42" />
              </g>

              {/* Decorative Wavy River Line */}
              <path 
                d="M 0 35 C 30 35, 45 25, 100 30" 
                fill="none" 
                stroke="rgba(255,255,255,0.02)" 
                strokeWidth="3" 
              />

              {/* Golden Dashed Spider Net Lines from Center to Points */}
              <g stroke="#c5a880" strokeWidth="0.15" strokeDasharray="0.5, 0.5" opacity="0.6">
                {points.map((p) => {
                  const isHovered = hoveredId === p.id;
                  return (
                    <line 
                      key={`line-${p.id}`} 
                      x1="50" y1="50" 
                      x2={p.pos.x} y2={p.pos.y} 
                      stroke={isHovered ? "#ffffff" : "#c5a880"}
                      strokeWidth={isHovered ? "0.3" : "0.15"}
                      opacity={isHovered ? "1" : "0.6"}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </g>
            </svg>

            {/* Center Map Pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-30 pointer-events-none">
              <svg 
                width="36" 
                height="48" 
                viewBox="0 0 24 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-2xl"
              >
                <path 
                  d="M12 0C5.37258 0 0 5.37258 0 12C0 21 12 32 12 32C12 32 24 21 24 12C24 5.37258 18.6274 0 12 0Z" 
                  fill="url(#goldGradient)"
                />
                <circle cx="12" cy="12" r="4" fill="#161616" />
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="24" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E3C690" />
                    <stop offset="1" stopColor="#A68340" />
                  </linearGradient>
                </defs>
              </svg>
              <span 
                className="text-[#c5a880] text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase mt-1 whitespace-nowrap bg-[#111111]/80 px-2 py-0.5 rounded backdrop-blur-sm"
              >
                EVENT NEST
              </span>
            </div>

            {/* Location Pins */}
            {points.map((p) => {
              const Icon = p.icon;
              const isHovered = hoveredId === p.id;
              
              return (
                <div 
                  key={p.id}
                  className={`absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 cursor-pointer ${
                    isHovered ? "z-40 scale-125" : "z-20 hover:z-40 hover:scale-110"
                  }`}
                  style={{ left: `${p.pos.x}%`, top: `${p.pos.y}%` }}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onTouchStart={() => setHoveredId(p.id)}
                  onTouchEnd={() => setHoveredId(null)}
                >
                  <div 
                    className={`w-7 h-7 md:w-9 md:h-9 rounded-full border flex items-center justify-center mb-1.5 transition-all duration-300 shadow-xl ${
                      isHovered 
                        ? "bg-[#c5a880] border-[#c5a880] text-[#111111]" 
                        : "bg-[#161616] border-[#c5a880]/30 text-[#c5a880]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-90" strokeWidth={1.5} />
                  </div>
                  <span 
                    className={`text-[6px] md:text-[7.5px] font-bold tracking-[0.2em] uppercase whitespace-nowrap px-1.5 py-0.5 rounded backdrop-blur-md border transition-colors ${
                      isHovered 
                        ? "bg-[#c5a880]/90 text-[#111111] border-[#c5a880]" 
                        : "bg-[#161616]/60 text-white/60 border-white/5"
                    }`}
                  >
                    {p.label}
                  </span>
                </div>
              );
            })}
          </Tilt>

          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=Event+Nest+Kunraghat+Gorakhpur"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 px-8 py-3 rounded-full border border-white/20 text-[10px] font-bold tracking-[0.2em] uppercase text-white hover:bg-white hover:text-[#161616] transition-all duration-300 shadow-lg hover:shadow-white/20"
          >
            OPEN IN GOOGLE MAPS
          </a>
        </div>

        {/* Right Side: Interactive Location List */}
        <div className="flex flex-col w-full h-full justify-center">
          {points.map((p) => {
            const Icon = p.icon;
            const isHovered = hoveredId === p.id;
            return (
              <div 
                key={p.id}
                className={`group flex items-center justify-between py-4 md:py-5 border-b border-white/10 last:border-0 cursor-pointer transition-all duration-500 ease-out ${
                  isHovered ? "pl-4 md:pl-6 bg-white/[0.02]" : "hover:pl-4 md:hover:pl-6 hover:bg-white/[0.02]"
                }`}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onTouchStart={() => setHoveredId(p.id)}
                onTouchEnd={() => setHoveredId(null)}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Icon Circle */}
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                    isHovered 
                      ? "border-[#c5a880] bg-[#c5a880]/10 text-[#c5a880] shadow-[0_0_15px_rgba(197,168,128,0.2)]" 
                      : "border-white/20 text-white/50 group-hover:text-[#c5a880] group-hover:border-[#c5a880]"
                  }`}>
                    <Icon strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  
                  {/* Text */}
                  <div className="flex flex-col">
                    <span className={`text-sm md:text-base font-normal transition-colors duration-300 ${
                      isHovered ? "text-[#c5a880]" : "text-white/90 group-hover:text-[#c5a880]"
                    }`}>
                      {p.name}
                    </span>
                    <span className="text-[10px] md:text-xs text-white/40 mt-1 font-light tracking-wide">
                      {p.subtitle}
                    </span>
                  </div>
                </div>

                {/* Time */}
                <span className={`text-[9px] md:text-[10px] font-bold tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ml-4 ${
                  isHovered ? "text-[#c5a880]" : "text-white/40 group-hover:text-[#c5a880]"
                }`}>
                  {p.time}
                </span>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
