"use client";

import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FooterData } from '../../types';

const socialIcons: Record<string, typeof FaFacebookF> = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

function ContactIcon({ children }: { children: ReactNode }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#D4AF37]/30 bg-[#0F1A2C] text-[#D4AF37]">
      {children}
    </span>
  );
}

function Accordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 lg:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left lg:hidden"
      >
        <span className="text-[17px] font-bold text-white">{title}</span>
        <ChevronDown size={18} className={`text-[#D4AF37] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className="hidden lg:block">
        <h3 className="text-[17px] font-bold text-white">{title}</h3>
        <span className="mt-2 block h-[2.5px] w-8 rounded-full bg-[#D4AF37]" />
      </div>
      <div className="hidden lg:block">{children}</div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function Footer({ data }: { data: FooterData }) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const half = Math.ceil(data.quick_links.length / 2);
  const quickLinksCol1 = data.quick_links.slice(0, half);
  const quickLinksCol2 = data.quick_links.slice(half);

  return (
    <footer className="relative border-t border-[#1E2D4A] bg-[#070D1F] text-white">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-12 sm:px-5 lg:grid-cols-[1.2fr_1.5fr_1.1fr] lg:gap-14 lg:py-16">
        {/* Brand Col */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="min-w-0"
        >
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="inline-block">
            <img
              src={data.logo_image}
              alt={data.logo_text}
              className="h-[52px] w-auto max-w-[240px] object-contain object-left sm:h-[62px]"
            />
          </a>
          <p className="mt-4 text-[14.5px] leading-7 text-slate-300 lg:max-w-[340px]">
            {data.description}
          </p>
          <div className="mt-6 flex gap-2.5">
            {data.socials.map((s, i) => {
              const Icon = socialIcons[s.icon] || FaFacebookF;
              return (
                <motion.a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.icon}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  whileHover={{ y: -3, scale: 1.08 }}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-slate-700 bg-[#0F1A2C] text-slate-300 transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
                >
                  <Icon size={16} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Links (Divided into 2 columns) */}
        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion title="Quick Navigation">
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-2.5 pt-1 lg:pt-4">
              <ul className="space-y-2.5 text-[14px]">
                {quickLinksCol1.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      onClick={(e) => handleLinkClick(e, l.href)}
                      className="inline-flex items-center gap-2 text-slate-300 transition-all hover:translate-x-1 hover:text-[#D4AF37]"
                    >
                      <span className="text-[#D4AF37]">›</span>
                      <span className="truncate">{l.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2.5 text-[14px]">
                {quickLinksCol2.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      onClick={(e) => handleLinkClick(e, l.href)}
                      className="inline-flex items-center gap-2 text-slate-300 transition-all hover:translate-x-1 hover:text-[#D4AF37]"
                    >
                      <span className="text-[#D4AF37]">›</span>
                      <span className="truncate">{l.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Accordion>
        </motion.div>

        {/* Corporate Contact */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion title="Corporate Contact">
            <ul className="mt-1 space-y-4 text-[14.5px] text-slate-300 lg:mt-4">
              <li>
                <a
                  href={`tel:${data.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="group flex items-center gap-3 transition-colors hover:text-[#D4AF37]"
                >
                  <ContactIcon>
                    <Phone size={17} className="transition-transform group-hover:scale-110" />
                  </ContactIcon>
                  <span className="transition-colors group-hover:text-[#D4AF37]">{data.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="group flex items-center gap-3 transition-colors hover:text-[#D4AF37]"
                >
                  <ContactIcon>
                    <Mail size={17} className="transition-transform group-hover:scale-110" />
                  </ContactIcon>
                  <span className="transition-colors group-hover:text-[#D4AF37]">{data.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <ContactIcon>
                  <MapPin size={17} />
                </ContactIcon>
                <span className="leading-5">{data.contact.address}</span>
              </li>
            </ul>
          </Accordion>
        </motion.div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800/80 bg-[#050A18] py-5">
        <div className="mx-auto max-w-[1240px] px-4 text-center text-[13.5px] text-slate-400 sm:px-5">
          <p>{data.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
