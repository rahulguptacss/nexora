"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { HeaderData } from '../../types';

function Logo({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="h-10 w-auto object-contain sm:h-11 lg:h-[58px]" />;
}

export default function Header({ data }: { data: HeaderData }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = data.links
        .map((l) => (l.href.startsWith('#') ? l.href.substring(1) : null))
        .filter(Boolean) as string[];

      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.links]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      setOpen(false);

      setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(targetId);
        }
      }, 120);
    } else {
      setOpen(false);
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return activeSection === href.substring(1);
    }
    return false;
  };

  return (
    <div className="sticky top-0 z-50 px-3 pt-3 pb-2 sm:px-5 sm:pt-4 sm:pb-3">
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 mx-auto flex h-[66px] max-w-[1240px] items-center justify-between rounded-full border border-slate-200/80 bg-white/95 px-4 shadow-[0_10px_30px_rgba(10,17,40,0.08)] backdrop-blur-md lg:h-[76px] lg:px-6"
      >
        {/* Brand / Logo */}
        <div className="flex w-full items-center justify-between lg:w-auto">
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="shrink-0 flex items-center">
              <Logo src={data.logo_image} alt={data.logo_text} />
            </a>
          </motion.div>

          {/* Mobile Right Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={data.button_link}
              onClick={(e) => handleNavClick(e, data.button_link)}
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5B842] px-3.5 py-1.5 text-[12px] font-bold text-[#0A1128] shadow-sm hover:brightness-105"
            >
              {data.button_text}
              <span aria-hidden>›</span>
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-[#D4AF37]/30 bg-slate-50 text-[#0A1128] transition-colors hover:bg-slate-100"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation menu"
            >
              {open ? <X size={20} className="text-[#0A1128]" /> : <Menu size={20} className="text-[#0A1128]" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {data.links.map((link, i) => {
            const active = isActive(link.href);
            return (
              <motion.div
                key={link.name}
                className="relative"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.04, duration: 0.3 }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative flex items-center gap-1 py-2 text-[14.5px] font-semibold transition-colors duration-200 ${
                    active ? 'text-[#D4AF37]' : 'text-[#0A1128] hover:text-[#D4AF37]'
                  }`}
                >
                  {link.name}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-[2.5px] w-full rounded-full bg-[#D4AF37]"
                    />
                  ) : null}
                </a>
              </motion.div>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden lg:block"
        >
          <a
            href={data.button_link}
            onClick={(e) => handleNavClick(e, data.button_link)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5B842] px-5 py-2.5 text-[14px] font-bold text-[#0A1128] shadow-md shadow-[#D4AF37]/25 transition-all hover:from-[#E5B842] hover:to-[#D4AF37]"
          >
            {data.button_text}
            <span aria-hidden>›</span>
          </a>
        </motion.div>
      </motion.header>

      {/* Mobile Drawer with Drag & Touch Support */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-3 right-3 top-[78px] z-20 max-h-[calc(100vh-100px)] overflow-y-auto overscroll-contain rounded-[20px] border border-slate-200 bg-white/98 p-4 shadow-[0_20px_50px_rgba(10,17,40,0.18)] backdrop-blur-lg touch-manipulation sm:left-5 sm:right-5 sm:top-[88px]"
          >
            <div className="flex flex-col space-y-1">
              {data.links.map((link) => {
                const active = isActive(link.href);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15.5px] font-semibold transition-all ${
                      active
                        ? 'bg-[#0A1128] text-[#D4AF37]'
                        : 'text-[#0A1128] hover:bg-slate-100 hover:text-[#D4AF37]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {active ? <span className="h-2 w-2 rounded-full bg-[#D4AF37]" /> : null}
                  </a>
                );
              })}

              <div className="pt-3 pb-1 border-t border-slate-100 mt-2">
                <a
                  href={data.button_link}
                  onClick={(e) => handleNavClick(e, data.button_link)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5B842] py-3 text-center text-[15px] font-bold text-[#0A1128] shadow-md shadow-[#D4AF37]/20"
                >
                  {data.button_text}
                  <span aria-hidden>›</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
