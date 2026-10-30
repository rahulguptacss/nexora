"use client";

import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Lightbulb, Users } from 'lucide-react';
import { AboutSectionData } from '../../types';
import { fadeUp, inView, stagger } from '../../motion';

const icons: Record<string, { Icon: ComponentType<{ size?: number }>; bg: string; text: string }> = {
  users: { Icon: Users, bg: '#0A1128', text: '#D4AF37' },
  bulb: { Icon: Lightbulb, bg: '#D4AF37', text: '#0A1128' },
  chart: { Icon: BarChart3, bg: '#0A1128', text: '#D4AF37' },
};

export default function About({ data, showButton = true }: { data: AboutSectionData; showButton?: boolean }) {
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative overflow-hidden bg-[#0F1A2C] py-14 text-white sm:py-18 lg:py-20">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-[#D4AF37]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-[#1E3E62]/15 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-[1240px] items-center gap-10 px-4 sm:px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* Left Side: Image with Gold Accents */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={inView}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={inView}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="absolute -bottom-3 -left-3 h-24 w-24 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#E5B842] sm:-bottom-5 sm:-left-5 sm:h-36 sm:w-32"
          />
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={inView}
            transition={{ delay: 0.35, type: 'spring', stiffness: 180 }}
            className="absolute -right-3 top-8 hidden h-20 w-20 rounded-full border-2 border-[#D4AF37]/30 bg-[#0A1128]/40 lg:block"
          />
          <div className="relative z-10 overflow-hidden rounded-[20px] border border-slate-700/80 bg-[#0A1128] p-2 shadow-2xl sm:rounded-[24px]">
            <motion.img
              src={data.image}
              alt={data.title_highlight}
              initial={{ scale: 1.05, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={inView}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
              className="h-[260px] w-full rounded-[16px] object-cover sm:h-[380px] sm:rounded-[20px] lg:h-[460px]"
            />
          </div>
        </motion.div>

        {/* Right Side: Text & Features */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={inView}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 text-[11px] font-bold tracking-[1.8px] text-[#E5B842] sm:text-[12px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            {data.subtitle}
          </motion.div>

          <motion.h2 variants={fadeUp} className="mt-3 text-[26px] font-extrabold leading-[1.2] text-white sm:text-[34px] lg:text-[40px]">
            <span className="block">{data.title_line1}</span>
            <span className="block bg-gradient-to-r from-[#F3C766] via-[#D4AF37] to-[#E5B842] bg-clip-text text-transparent">
              {data.title_highlight}
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-4 max-w-[540px] text-[15px] leading-7 text-slate-300 sm:text-[16px]">
            {data.description}
          </motion.p>

          <div className="mt-6 space-y-4">
            {data.features.map((f) => {
              const item = icons[f.icon] || icons.users;
              const Icon = item.Icon;
              return (
                <motion.div
                  variants={fadeUp}
                  key={f.title}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="flex items-start gap-3.5 rounded-xl border border-slate-800/80 bg-[#0A1128] p-3.5 shadow-sm transition-all hover:border-[#D4AF37]/50"
                >
                  <span
                    className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#D4AF37]/30 bg-[#0F1A2C] text-[#D4AF37] font-bold shadow-sm"
                  >
                    <Icon size={19} />
                  </span>
                  <div>
                    <h3 className="text-[16px] font-bold text-white">{f.title}</h3>
                    <p className="mt-0.5 text-[14px] leading-6 text-slate-300">{f.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {showButton && data.button ? (
            <motion.div variants={fadeUp} className="mt-8">
              <a
                href={data.button.href}
                onClick={(e) => handleScrollClick(e, data.button.href)}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5B842] px-6 py-3 text-[14.5px] font-bold text-[#0A1128] shadow-md shadow-[#D4AF37]/25 transition-all hover:from-[#E5B842] hover:to-[#D4AF37] hover:scale-[1.02]"
              >
                {data.button.text}
                <span aria-hidden>→</span>
              </a>
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
