"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSectionData } from '../../types';

export default function Hero({ data }: { data: HeroSectionData }) {
  const slides = data.slides || [];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (next: number) => {
    if (!slides.length) return;
    setIndex((next + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  if (!slides.length) return null;

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="home"
      className="relative -mt-[106px] flex min-h-[calc(100vh-48px)] flex-col justify-center overflow-hidden bg-[#0A1128] pt-[124px] pb-12 text-white sm:-mt-[112px] sm:pt-[132px] lg:-mt-[118px] lg:pt-[140px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative Glow Elements */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#1E3E62]/30 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#162544_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      {/* Slider Nav Buttons */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-700 bg-[#0F1A2C]/80 text-white backdrop-blur-sm transition-all hover:border-[#D4AF37] hover:text-[#D4AF37] sm:left-5 sm:h-11 sm:w-11"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-700 bg-[#0F1A2C]/80 text-white backdrop-blur-sm transition-all hover:border-[#D4AF37] hover:text-[#D4AF37] sm:right-5 sm:h-11 sm:w-11"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slides Container */}
      <div className="relative z-10 overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {slides.map((slide) => (
            <div key={slide.title_highlight} className="w-full shrink-0 px-8 sm:px-14 lg:px-12">
              <div className="mx-auto grid max-w-[1240px] items-center gap-8 py-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-[11px] font-bold tracking-[1.8px] text-[#E5B842] sm:text-[12px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    {slide.subtitle}
                  </div>
                  <h1 className="mt-4 text-[30px] font-extrabold leading-[1.15] tracking-tight sm:text-[42px] lg:text-[48px]">
                    <span className="block text-white">{slide.title_line1}</span>
                    <span className="mt-1 block bg-gradient-to-r from-[#F3C766] via-[#D4AF37] to-[#E5B842] bg-clip-text text-transparent">
                      {slide.title_highlight}
                    </span>
                    {slide.title_line2 ? <span className="block text-slate-200">{slide.title_line2}</span> : null}
                  </h1>
                  <p className="mt-4 max-w-[500px] text-[15px] leading-7 text-slate-300 sm:text-[16px]">
                    {slide.description}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <a
                      href={slide.primary_button.href}
                      onClick={(e) => handleCtaClick(e, slide.primary_button.href)}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5B842] px-6 py-3.5 text-[14.5px] font-bold text-[#0A1128] shadow-lg shadow-[#D4AF37]/25 transition-all hover:from-[#E5B842] hover:to-[#D4AF37] hover:scale-[1.02]"
                    >
                      {slide.primary_button.text}
                      <span aria-hidden>→</span>
                    </a>
                    <a
                      href="#about"
                      onClick={(e) => handleCtaClick(e, '#about')}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-[#0F1A2C]/60 px-5 py-3 text-[14px] font-semibold text-slate-300 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                    >
                      Learn More
                    </a>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[20px] border border-[#D4AF37]/25 bg-[#0F1A2C] shadow-2xl sm:rounded-[24px]">
                  <img
                    src={slide.image}
                    alt={slide.title_highlight}
                    className="h-[240px] w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-[320px] lg:h-[380px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="relative z-10 mt-6 flex justify-center gap-2 lg:absolute lg:bottom-6 lg:left-[max(2rem,calc((100%-1240px)/2))] lg:mt-0 lg:justify-start">
        {slides.map((slide, i) => (
          <button
            key={slide.title_highlight}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-[#D4AF37]' : 'w-2.5 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
